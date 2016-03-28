import Debug from 'debug';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index.js';

const log = Debug('iq');

export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunk
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ));

  // Enable Webpack hot module replacement for reducers
	if (module.hot) {
    log('Module is hot!');
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
