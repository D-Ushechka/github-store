import rootStore from '@store/RootStore';
import { ILocalStore } from '@utils/useLocalStore';
import { action, makeObservable, observable } from 'mobx';

type PrivateFields = '_text';

export default class InputStore implements ILocalStore {
  private _text: string = rootStore.query.getParam('search')
    ? (rootStore.query.getParam('search') as string)
    : 'ktsstudio';

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _text: observable,
      setText: action.bound,
      search: action.bound,
    });
  }

  get text(): string {
    return this._text;
  }

  setText(enteredText: string) {
    this._text = enteredText;
  }

  search() {
    rootStore.query.setParam('search', this.text);
  }

  destroy(): void {}
}
