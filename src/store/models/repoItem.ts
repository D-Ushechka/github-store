import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from './GitHubRepoOwner';

export type RepoItemApi = {
  id: number;
  url: string;
  name: string;
  owner: GitHubRepoOwnerApi;
  updated_at: string;
  stargazers_count: number;
};

export type RepoItemModel = {
  id: number;
  url: string;
  name: string;
  owner: GitHubRepoOwnerModel;
  updatedAt: Date;
  stargazersCount: number;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  url: from.url,
  name: from.name,
  owner: normalizeGitHubRepoOwner(from.owner),
  updatedAt: new Date(from.updated_at),
  stargazersCount: from.stargazers_count,
});
