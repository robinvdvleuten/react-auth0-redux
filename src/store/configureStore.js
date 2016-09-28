import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import objectPath from 'object-path';
import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    persistState(['auth0.idToken'], {
      slicer: (paths) => (state) => (
        paths.reduce((substate, path) => {
          objectPath.set(substate, path, objectPath.get(state, path));
          return substate;
        }, {})
      )
    }),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  return store;
}
