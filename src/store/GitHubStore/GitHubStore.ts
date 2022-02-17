import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod, ApiResponse } from '@shared/store/ApiStore/types';

import {
  IGitHubStore,
  GetOrganizationReposListParams,
  RepoItem,
  PostUserRepoParam,
  ErrorAnswer,
  SuccesRepo,
} from './types';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore('https://api.github.com');

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], ErrorAnswer>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: '/orgs/' + params.organizationName + '/repos',
      headers: {},
      data: {},
    });
  }

  async postUserRepo(
    params: PostUserRepoParam
  ): Promise<ApiResponse<SuccesRepo, ErrorAnswer>> {
    return await this.apiStore.request({
      method: HTTPMethod.POST,
      endpoint: `/user/repos`,
      headers: { authorization: `token ${params.userToken}` },
      data: {
        name: params.repoName,
        description: params.repoDescription,
        private: params.repoPrivate,
      },
    });
  }
}
