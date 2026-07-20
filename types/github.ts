export interface PullRequest {
  id: string;
  repo: string; // e.g. "owner/repo"
  url: string;
  title: string;
  state: "MERGED" | "OPEN" | "CLOSED";
  tag: string; // e.g. "bug fix", "CI", "accessibility"
  additions: number;
  createdAt: string;
}

export interface GithubApiResponse {
  prs: PullRequest[];
  error?: string;
}

export interface GithubGraphQLResponse {
  data?: {
    viewer?: {
      login: string;
      pullRequests?: {
        nodes: Array<{
          id: string;
          title: string;
          url: string;
          state: "MERGED" | "OPEN" | "CLOSED";
          additions: number;
          deletions: number;
          repository: {
            nameWithOwner: string;
            owner: {
              login: string;
            };
          };
          createdAt: string;
        }>;
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}
