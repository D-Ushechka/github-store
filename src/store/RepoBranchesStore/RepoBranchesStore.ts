import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@shared/collection';
import { BranchItemModel, normalizeBranchItem } from '@store/models';
import gitHubStore from '@store/RootStore';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { IRepoBranchesStore, GetRepoBranchesParams } from './types';

type PrivateFields = '_branchesList' | '_meta';

export default class RepoBranchesStore
  implements ILocalStore, IRepoBranchesStore
{
  private _branchesList: CollectionModel<string, BranchItemModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branchesList: observable.ref,
      _meta: observable,
      meta: computed,
      branchesList: computed,
      getRepoBranches: action,
    });
  }

  get branchesList(): BranchItemModel[] {
    return linearizeCollection(this._branchesList);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoBranches(params: GetRepoBranchesParams): Promise<void> {
    if (!params.repoName) return;

    this._meta = Meta.loading;
    this._branchesList = getInitialCollectionModel();

    const result = await gitHubStore.getBranchesList({
      owner: params.orgName,
      repo: params.repoName,
    });

    runInAction(() => {
      if (!result.success) {
        this._meta = Meta.error;
        return;
      }

      try {
        const list: BranchItemModel[] = [];
        for (const item of result.data) {
          list.push(normalizeBranchItem(item));
        }

        this._meta = Meta.success;
        this._branchesList = normalizeCollection(
          list,
          (listItem) => listItem.name
        );
      } catch (e) {
        this._meta = Meta.error;
        this._branchesList = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {}
}
