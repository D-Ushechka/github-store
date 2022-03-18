import * as Router from 'react-router-dom';

import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
  const location = Router.useLocation();
  const history = Router.useHistory();

  rootStore.query.setSearch(location.search);
  rootStore.query.setHistory(history, location);
};
