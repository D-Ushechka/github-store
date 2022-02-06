import ApiStore from 'shared/store/ApiStore';
import {RequestParams, HTTPMethod} from 'shared/store/ApiStore/types';
import {IGitHubStore, GetOrganizationReposListParams, ApiResp, SuccessRepoItem, ErrorRepoItem} from "./types";


export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com'); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList<RepoName = string>(params: GetOrganizationReposListParams): Promise<ApiResp<RepoName>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        let result:ApiResp<RepoName> = {};

        let paramsApi : RequestParams<any> = {
            method: HTTPMethod.GET, //"GET",
            endpoint:
              this.apiStore.baseUrl + "/orgs/" + params.organizationName + "/repos",
            headers: {},
            data: {},
          };
    
          let response = await this.apiStore.request<SuccessRepoItem<RepoName>, ErrorRepoItem>(paramsApi);
          const {data, success} = response;
          if (success) {
            result.data = (data as SuccessRepoItem<RepoName>).map((item) => item.name);
          } else {
            result.error = (data as ErrorRepoItem).message;
          }

          return result;
    }
}
