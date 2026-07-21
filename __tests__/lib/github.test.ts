import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  env: {
    GITHUB_TOKEN: "test-token",
  },
}));

import { fetchGithubContributions } from "@/lib/github";
import { GET } from "@/app/api/github/route";

const mockFetch = vi.fn();

describe("GitHub integration", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);
  });

  it("returns transformed pull requests for successful GraphQL responses", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          viewer: {
            login: "octocat",
            pullRequests: {
              nodes: [
                {
                  id: "pr-1",
                  title: "Add accessibility improvements",
                  url: "https://github.com/example/repo/pull/1",
                  state: "MERGED",
                  additions: 12,
                  deletions: 2,
                  repository: {
                    nameWithOwner: "example/portfolio",
                    owner: { login: "someone-else" },
                  },
                  createdAt: "2024-01-01T00:00:00Z",
                },
                {
                  id: "pr-2",
                  title: "Refactor dashboard flow",
                  url: "https://github.com/example/repo/pull/2",
                  state: "MERGED",
                  additions: 3,
                  deletions: 1,
                  repository: {
                    nameWithOwner: "example/other",
                    owner: { login: "someone-else" },
                  },
                  createdAt: "2024-01-02T00:00:00Z",
                },
              ],
            },
          },
        },
      }),
    });

    const result = await fetchGithubContributions();

    expect(result.prs).toHaveLength(1);
    expect(result.prs[0]).toMatchObject({
      title: "Add accessibility improvements",
      repo: "example/portfolio",
      tag: "accessibility",
      additions: 12,
      state: "MERGED",
    });
  });

  it("returns an error when the GitHub API responds with an error status", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "boom",
    });

    const result = await fetchGithubContributions();

    expect(result.prs).toEqual([]);
    expect(result.error).toContain("status 500");
  });

  it("returns an API error response for the route when github fetch fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 502,
      statusText: "Bad Gateway",
      text: async () => "down",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toMatchObject({
      prs: [],
      issues: [],
      error: expect.stringContaining("status 502"),
    });
  });
});
