import ApiStore from 'shared/store/ApiStore';
import {RequestParams, HTTPMethod} from 'shared/store/ApiStore/types';
import {IGitHubStore, GetOrganizationReposListParams, ApiResp, SuccessRepoItem, ErrorRepoItem} from "./types";


export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com'); 


    async getOrganizationReposList<RepoName = string>(params: GetOrganizationReposListParams): Promise<ApiResp<RepoName>> {
        
        let result:ApiResp<RepoName> = {};

        let paramsApi : RequestParams<any> = {
            method: HTTPMethod.GET, 
            endpoint:
              "/orgs/" + params.organizationName + "/repos",
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
