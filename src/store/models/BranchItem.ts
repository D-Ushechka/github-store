export type BranchItemApi = {
  name: string;
};

export type BranchItemModel = {
  name: string;
};

export const normalizeBranchItem = (from: BranchItemApi): BranchItemModel => ({
  name: from.name,
});
