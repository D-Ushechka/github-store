import { ApiResponse } from "shared/store/ApiStore/types";


 export type GetOrganizationReposListParams = {
    organizationName: string;    
}

export type RepoItem = {
    name: string;
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}

export type PostUserRepoParam = {
    userToken: string,
    repoName: string,
    repoDescription?: string,
    repoPrivate?: boolean
}

export interface IGitHubStore {
 postUserRepo(params: PostUserRepoParam): Promise<ApiResponse<any, any>>
}