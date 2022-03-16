import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from '@shared/collection';
import { BranchItemModel, normalizeBranchItem } from '@store/models';
import rootStore from '@store/RootStore';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

import { IRepoBranchesStore } from './types';

type PrivateFields = '_branchesList' | '_meta' | '_repoName' | '_orgName';

export default class RepoBranchesStore
  implements ILocalStore, IRepoBranchesStore
{
  private _branchesList: CollectionModel<string, BranchItemModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;
  private _repoName: string | null;
  private _orgName: string;

  constructor(repoName: string | null, orgName: string) {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branchesList: observable.ref,
      _meta: observable,
      _repoName: observable,
      _orgName: observable,
      meta: computed,
      branchesList: computed,
      getRepoBranches: action,
      setRepoName: action.bound,
    });
    this._repoName = repoName;
    this._orgName = orgName;
  }

  get branchesList(): BranchItemModel[] {
    return linearizeCollection(this._branchesList);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepoBranches(): Promise<void> {
    if (!this._repoName) return;

    this._meta = Meta.loading;
    this._branchesList = getInitialCollectionModel();

    const result = await rootStore.gitHubStore.getBranchesList({
      owner: this._orgName,
      repo: this._repoName,
    });

    runInAction(() => {
      if (!result.success) {
        this._meta = Meta.error;
        return;
      }

      try {
        const list = result.data.map(normalizeBranchItem);

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

  setRepoName(value: string) {
    this._repoName = value;
  }

  private readonly _searchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this._orgName = search as string;
    }
  );

  private readonly _repoReaction: IReactionDisposer = reaction(
    () => this._repoName,
    () => {
      this.getRepoBranches();
    }
  );

  destroy(): void {}
}
