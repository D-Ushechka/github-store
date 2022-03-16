import * as React from 'react';
import 'regenerator-runtime';
import { render } from 'react-dom';

import * as Router from 'react-router-dom';

import App from './App';

import 'config/configureMobX.ts';

render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}   
