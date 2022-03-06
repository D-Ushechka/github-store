import GitHubStore from './GitHubStore';

export default class RootStore {
  readonly gitHubStore = new GitHubStore();
}
