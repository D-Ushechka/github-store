import { ApiResponse } from '@shared/store/ApiStore/types';

export type GetOrganizationReposListParams = {
  organizationName: string;
  perPage?: number;
  page?: number;
};

export type GitHubRepoOwner = {
  id: number;
  url: string;
  login: string;
  avatar_url: string;
};

export type RepoItem = {
  id: number;
  url: string;
  name: string;
  owner: GitHubRepoOwner;
  updated_at: string;
  stargazers_count: number;
};

export type ErrorAnswer = {
  message: string;
  documentation_url: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], ErrorAnswer>>;

  postUserRepo(
    params: PostUserRepoParam
  ): Promise<ApiResponse<SuccesRepo, ErrorAnswer>>;

  getBranchesList(
    params: GetBranchesListParams
  ): Promise<ApiResponse<BranchItem[], ErrorAnswer>>;
}

export type PostUserRepoParam = {
  userToken: string;
  repoName: string;
  repoDescription?: string;
  repoPrivate?: boolean;
};

export type SuccesRepo = {
  id: number;
  name: string;
  url: string;
};

export type GetBranchesListParams = {
  owner: string;
  repo: string;
};

export type BranchItem = {
  name: string;
};
