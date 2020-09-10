import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      this.store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
