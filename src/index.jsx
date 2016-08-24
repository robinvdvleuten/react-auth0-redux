import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Application from './containers/Application';
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';
import rootReducer from './reducers'
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(store) {
  return (nextState, replace) => {
    const state = store.getState();

    // @TODO Validate expiration of id token...
    if (!state.user.isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Application}>
        <Route path="/login" component={LoginView} />

        <Route onEnter={requireAuth(store)}>
          <Route path="/" component={DashboardView} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
