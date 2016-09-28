import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { logout } from './actions/auth0';
import Application from './containers/Application';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import { isAuthenticated, isTokenExpired } from './reducers/auth0';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function forceLogout(nextState, replace, next) {
  store.dispatch(logout()).then(() => {
    replace('/login');
    next();
  });
}

function requireAuth(nextState, replace, next) {
  const state = store.getState();

  if (!isAuthenticated(state.auth0) || isTokenExpired(state.auth0)) {
    return store.dispatch(logout()).then(() => {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });

      next();
    });
  }

  next();
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Application}>
        <Route path="/login" component={Login} />

        <Route onEnter={requireAuth}>
          <Route path="/" component={Dashboard} />
          <Route path="/logout" onEnter={forceLogout} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
