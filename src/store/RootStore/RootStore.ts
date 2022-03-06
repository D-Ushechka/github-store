import GitHubStore from './GitHubStore';
import QueryParamsStore from './QueryParamsStore';

export default class RootStore {
  readonly gitHubStore = new GitHubStore();

  readonly query = new QueryParamsStore();
}
