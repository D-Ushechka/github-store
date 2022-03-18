import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_history' | '_location';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _history: any = null;
  private _location: any = null;
  private _search: string = '';
  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _history: observable,
      _location: observable,
      setSearch: action.bound,
      setParam: action.bound,
      setHistory: action.bound,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setParam(key: string, value: string) {
    const nextParams = { ...this._params, [key]: value };

    const nextSearch = qs.stringify(nextParams);

    this._history.replace({
      ...this._location,
      search: nextSearch,
    });
  }

  setHistory(history: any, location: any) {
    this._history = history;
    this._location = location;
  }
}
