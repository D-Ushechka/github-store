export type GetRepoBranchesParams = {
  orgName: string;
  repoName: string;
};

export interface IRepoBranchesStore {
  getRepoBranches(params: GetRepoBranchesParams): Promise<void>;
}
