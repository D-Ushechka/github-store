import ReposSearchPage from '@pages/ReposSearchPage';
import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/repos/:name?" component={ReposSearchPage} />
        <Redirect to="/repos" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
