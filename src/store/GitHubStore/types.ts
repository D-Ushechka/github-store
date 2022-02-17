import { ApiResponse } from '../../shared/store/ApiStore/types';

export type GetOrganizationReposListParams = {
  organizationName: string;
};

export type RepoItem = {
  name: string;
};

export type ErrorAnswer = {
  message: string;
  documentation_url: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], ErrorAnswer>>;
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

export interface IGitHubStore {
  postUserRepo(
    params: PostUserRepoParam
  ): Promise<ApiResponse<SuccesRepo, ErrorAnswer>>;
}
