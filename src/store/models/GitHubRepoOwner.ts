export type GitHubRepoOwnerApi = {
  id: number;
  url: string;
  login: string;
  avatar_url: string;
};

export type GitHubRepoOwnerModel = {
  id: number;
  url: string;
  login: string;
  avatarUrl: string;
};

export const normalizeGitHubRepoOwner = (
  from: GitHubRepoOwnerApi
): GitHubRepoOwnerModel => ({
  id: from.id,
  url: from.url,
  login: from.login,
  avatarUrl: from.avatar_url,
});
