import ReposSearchPage from '@pages/ReposSearchPage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
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
