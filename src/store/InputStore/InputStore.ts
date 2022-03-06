import rootStore from '@store/RootStore';
import { ILocalStore } from '@utils/useLocalStore';
import { computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_text';

export default class InputStore implements ILocalStore {
  private _text: string = rootStore.query.getParam('search')
    ? (rootStore.query.getParam('search') as string)
    : 'ktsstudio';

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _text: observable,
      text: computed,
    });
  }

  get text(): string {
    return this._text;
  }

  set text(enteredText: string) {
    this._text = enteredText;
  }

  destroy(): void {}
}
