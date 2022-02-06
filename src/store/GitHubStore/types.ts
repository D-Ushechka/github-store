/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
 export type GetOrganizationReposListParams = {
    organizationName: string;    
}


export type ApiResp<RepoName> = {
    data?: RepoName[],
    error?: string;
}
    

export interface IGitHubStore {
    getOrganizationReposList<RepoItem>(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem>>;
}

export type SuccessRepoItem<Name> = Array<{name: Name}>;


export type ErrorRepoItem = {message: string};