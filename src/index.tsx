import React from 'react';

import ReposSearchPage from '@pages/ReposSearchPage';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/repos" component={ReposSearchPage} />
        <Route path="/repos/:name" component={ReposSearchPage} />
        <Redirect to="/repos" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
