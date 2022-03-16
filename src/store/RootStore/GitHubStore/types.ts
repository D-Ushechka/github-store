import { ApiResponse } from 'store/ApiStore/types';
import { BranchItemApi, RepoItemApi } from 'store/models';

export type GetOrganizationReposListParams = {
  organizationName: string;
  perPage?: number;
  page?: number;
};

export type ErrorAnswer = {
  message: string;
  documentation_url: string;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItemApi[], ErrorAnswer>>;

  postUserRepo(
    params: PostUserRepoParam
  ): Promise<ApiResponse<SuccesRepo, ErrorAnswer>>;

  getBranchesList(
    params: GetBranchesListParams
  ): Promise<ApiResponse<BranchItemApi[], ErrorAnswer>>;
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
