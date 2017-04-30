import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';

// Le store Redux de l'application
let store;

/**
 * Create the Redux store
 */
export function initStore(initialState = {}) {
  // Création du store Redux
  const middlewares = [];
  store             = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares)
  ));
  return store;
}

/**
 * @returns {*} Le store Redux de l'application
 */
export function getStore() {
  return store;
}
