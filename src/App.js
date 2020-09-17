import 'react-hot-loader/patch';
import 'whatwg-fetch';
import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import history from './history';
import { withAuth } from './routes/AuthRoutes';
import { Provider } from 'react-redux';
import createStore from './createStore';

import './styles/styles.scss';
import { APIProvider } from './api';
import PiApp from './components/PiApp';

const AppWithAuth = withAuth(PiApp, history);
const store = createStore();

const routes = (
  <Provider store={store}>
    <APIProvider>
      <Router history={history}>
        <AppWithAuth path="/" />
      </Router>
    </APIProvider>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('main'));
