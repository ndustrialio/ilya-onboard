import 'react-hot-loader/patch';
import 'whatwg-fetch';
import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import history from './history';
import { withAuth } from './routes/AuthRoutes';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import createStore from './createStore';

import './styles/styles.scss';

const RoutesWithAuth = withAuth(Routes, history);
const store = createStore();

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <RoutesWithAuth path="/" />
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('main'));
