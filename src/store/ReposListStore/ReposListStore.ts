import GitHubStore from '@store/GitHubStore';
import { IGitHubStore, RepoItem } from '@store/GitHubStore/types';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { IReposListStore } from './types';

type PrivateFields = '_meta' | '_repoList' | '_orgName' | '_page' | '_hasMore';

export default class ReposListStore implements ILocalStore, IReposListStore {
  private _meta: Meta = Meta.initial;
  private _repoList: RepoItem[] = [];
  private _orgName: string = 'ktsstudio';
  private _page: number = 1;
  private _hasMore: boolean = true;
  private readonly gitHubStore: IGitHubStore;

  constructor(gitHubStore: GitHubStore) {
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
      getOrgReposList: action,
    });
    this.gitHubStore = gitHubStore;
  }

  get meta(): Meta {
    return this._meta;
  }

  get repoList(): RepoItem[] {
    return this._repoList;
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

    const result = await this.gitHubStore.getOrganizationReposList({
      organizationName: this._orgName,
      perPage: 20,
      page: this.page,
    });

    runInAction(() => {
      if (result.success && result.data.length !== 0) {
        this._repoList.push(...result.data);
        this._meta = Meta.succes;
      } else {
        this._hasMore = false; // мб объединить с соседней?
        this._meta = Meta.error;
      }
    });
  }

  private reset() {
    this._page = 1;
    this._repoList = [];
    this._hasMore = true;
  }

  destroy(): void {}
}
