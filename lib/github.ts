import { env } from "./env";
import { PullRequest, GithubGraphQLResponse } from "../types/github";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// Named constants as requested in prompt.md
const ADDITIONS_MIN_THRESHOLD = 5;
const REQUEST_TIMEOUT_MS = 8000;

export async function fetchGithubContributions(): Promise<{
  prs: PullRequest[];
  error?: string;
}> {
  const token = env.GITHUB_TOKEN;

  if (!token) {
    return { prs: [], error: "GITHUB_TOKEN is not configured." };
  }

  // GraphQL query to get the authenticated viewer's pull requests
  const query = `
    query {
      viewer {
        login
        pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            state
            additions
            deletions
            repository {
              nameWithOwner
              owner {
                login
              }
            }
            createdAt
          }
        }
      }
    }
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache response for 1 hour (ISR)
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const statusText = response.statusText || "";
      let details = "";
      try {
        details = await response.text();
      } catch {
        // ignore
      }
      return {
        prs: [],
        error: `GitHub API responded with status ${response.status} ${statusText}. ${details}`,
      };
    }

    const payload = (await response.json()) as GithubGraphQLResponse;

    if (payload.errors && payload.errors.length > 0) {
      const messages = payload.errors.map((e) => e.message).join("; ");
      return {
        prs: [],
        error: `GitHub GraphQL Errors: ${messages}`,
      };
    }

    const viewer = payload.data?.viewer;
    if (!viewer) {
      return {
        prs: [],
        error: "Invalid payload from GitHub: 'viewer' is missing.",
      };
    }

    const username = viewer.login;
    const rawPrs = viewer.pullRequests?.nodes || [];

    const prs: PullRequest[] = rawPrs
      .filter((pr) => {
        // Filter out own repos
        const isOwnRepo = pr.repository.owner.login === username;
        const meetAdditions = pr.additions > ADDITIONS_MIN_THRESHOLD;
        return !isOwnRepo && meetAdditions && pr.state === "MERGED";
      })
      .map((pr) => {
        // Tag categorization heuristic
        let tag = "bug fix";
        const titleLower = pr.title.toLowerCase();
        if (
          titleLower.includes("ci") ||
          titleLower.includes("workflow") ||
          titleLower.includes("pipeline")
        ) {
          tag = "CI";
        } else if (
          titleLower.includes("a11y") ||
          titleLower.includes("accessib") ||
          titleLower.includes("aria")
        ) {
          tag = "accessibility";
        } else if (
          titleLower.includes("feat") ||
          titleLower.includes("add") ||
          titleLower.includes("create")
        ) {
          tag = "feature";
        } else if (
          titleLower.includes("refactor") ||
          titleLower.includes("clean") ||
          titleLower.includes("perf")
        ) {
          tag = "refactor";
        }

        return {
          id: pr.id,
          repo: pr.repository.nameWithOwner,
          url: pr.url,
          title: pr.title,
          state: pr.state,
          tag,
          additions: pr.additions,
          createdAt: pr.createdAt,
        };
      });

    return { prs };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof DOMException && err.name === "AbortError";
    const message = err instanceof Error ? err.message : String(err);
    return {
      prs: [],
      error: isAbort
        ? "GitHub API request timed out."
        : `Failed to fetch GitHub contributions: ${message}`,
    };
  }
}
