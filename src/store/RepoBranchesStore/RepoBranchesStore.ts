import { BranchItem, IGitHubStore } from '@store/GitHubStore/types';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { IRepoBranchesStore, GetRepoBranchesParams } from './types';

type PrivateFields = '_branchesList';

export default class RepoBranchesStore
  implements ILocalStore, IRepoBranchesStore
{
  private readonly _gitHubStore: IGitHubStore;
  private _branchesList: BranchItem[] = [];

  constructor(gitHubStore: IGitHubStore) {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branchesList: observable.ref,
      branchesList: computed,
      getRepoBranches: action,
    });
    this._gitHubStore = gitHubStore;
  }

  get branchesList(): BranchItem[] {
    return this._branchesList;
  }

  async getRepoBranches(params: GetRepoBranchesParams): Promise<void> {
    if (!params.repoName) return;

    this._branchesList = [];

    const result = await this._gitHubStore.getBranchesList({
      owner: params.orgName,
      repo: params.repoName,
    });

    runInAction(() => {
      if (result.success) this._branchesList = result.data;
    });
  }

  destroy(): void {}
}
