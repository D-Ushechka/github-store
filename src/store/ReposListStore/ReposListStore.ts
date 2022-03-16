import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  pushCollection,
} from '@shared/collection';
import { normalizeRepoItem, RepoItemModel } from '@store/models';
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

import { IReposListStore } from './types';

type PrivateFields = '_meta' | '_repoList' | '_orgName' | '_page' | '_hasMore';

export default class ReposListStore implements ILocalStore, IReposListStore {
  private _meta: Meta = Meta.initial;
  private _repoList: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
  private _orgName: string = rootStore.query.getParam('search')
    ? (rootStore.query.getParam('search') as string)
    : 'ktsstudio';
  private _page: number = 1;
  private _hasMore: boolean = true;

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _meta: observable,
      _repoList: observable,
      _orgName: observable,
      _page: observable,
      _hasMore: observable,
      meta: computed,
      repoList: computed,
      orgName: computed,
      page: computed,
      hasMore: computed,
      getReposListInit: action.bound,
      getReposListMore: action.bound,
      getOrgReposList: action.bound,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get repoList(): RepoItemModel[] {
    return linearizeCollection(this._repoList);
  }

  get orgName(): string {
    return this._orgName;
  }

  get page(): number {
    return this._page;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  set orgName(enteredText: string) {
    this._orgName = enteredText;
  }

  async getOrgReposList(initial: boolean): Promise<void> {
    this._meta = Meta.loading;
    if (initial) {
      this._page += 1;
    } else {
      this.reset();
    }

    const result = await rootStore.gitHubStore.getOrganizationReposList({
      organizationName: this._orgName,
      perPage: 20,
      page: this.page,
    });

    runInAction(() => {
      if (!result.success) {
        this._meta = Meta.error;
        this._hasMore = false;
        return;
      }

      if (result.data.length === 0) {
        this._hasMore = false;
      }

      try {
        this._meta = Meta.success;

        const list = result.data.map(normalizeRepoItem);

        this._repoList = pushCollection(
          this._repoList,
          list,
          (listItem) => listItem.id
        );
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
  getReposListInit(): void {
    this.getOrgReposList(false);
  }
  getReposListMore(): void {
    this.getOrgReposList(true);
  }

  private reset() {
    this._page = 1;
    this._repoList = getInitialCollectionModel();
    this._hasMore = true;
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this._orgName = search as string;
      this.getReposListInit();
    }
  );
}
