export interface IReposListStore {
  getOrgReposList(initial: boolean): Promise<void>;
}
