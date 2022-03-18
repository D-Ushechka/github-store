import React from 'react';

import ReactDOM from 'react-dom';
import * as Router from 'react-router-dom';

import App from './App';

import '@config/configureMobX.ts';

ReactDOM.render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
