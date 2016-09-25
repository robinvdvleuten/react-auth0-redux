import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Application from './containers/Application';
import DashboardView from './containers/DashboardView';
import LoginView from './containers/LoginView';
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
        <Route path="/login" component={LoginView} />

        <Route onEnter={requireAuth(store)}>
          <Route path="/" component={DashboardView} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
