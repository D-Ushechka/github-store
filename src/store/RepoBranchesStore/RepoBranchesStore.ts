import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@shared/collection';
import { IGitHubStore } from '@store/GitHubStore/types';
import { BranchItemModel, normalizeBranchItem } from '@store/models';
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
  private _branchesList: CollectionModel<string, BranchItemModel> =
    getInitialCollectionModel();

  constructor(gitHubStore: IGitHubStore) {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branchesList: observable.ref,
      branchesList: computed,
      getRepoBranches: action,
    });
    this._gitHubStore = gitHubStore;
  }

  get branchesList(): BranchItemModel[] {
    return linearizeCollection(this._branchesList);
  }

  async getRepoBranches(params: GetRepoBranchesParams): Promise<void> {
    if (!params.repoName) return;

    this._branchesList = getInitialCollectionModel();

    const result = await this._gitHubStore.getBranchesList({
      owner: params.orgName,
      repo: params.repoName,
    });

    runInAction(() => {
      if (!result.success) return;

      try {
        const list = [];
        for (const item of result.data) {
          list.push(normalizeBranchItem(item));
        }
        this._branchesList = normalizeCollection(
          list,
          (listItem) => listItem.name
        );
      } catch (e) {
        this._branchesList = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {}
}
