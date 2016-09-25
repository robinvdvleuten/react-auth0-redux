import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Application from './containers/Application';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import { isAuthenticated, isTokenExpired } from './reducers/session';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(store) {
  return (nextState, replace) => {
    const state = store.getState();

    // @TODO Logout when token is expired
    if (!isAuthenticated(state.session) || isTokenExpired(state.session)) {
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
        <Route path="/login" component={Login} />

        <Route onEnter={requireAuth(store)}>
          <Route path="/" component={Dashboard} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
