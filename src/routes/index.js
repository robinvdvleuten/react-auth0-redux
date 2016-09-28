import React from 'react';
import { Route } from 'react-router';
import { logout } from '../actions/auth0';
import Application from '../containers/Application';
import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import { isAuthenticated, isTokenExpired } from '../reducers/auth0';

export default function createRoutes(store) {
  const forceLogout = (nextState, replace, next) => {
    store.dispatch(logout()).then(() => {
      replace('/login');
      next();
    });
  };

  const requireAuth = (nextState, replace, next) => {
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
  };

  return (
    <Route component={Application}>
      <Route path="/login" component={Login} />

      <Route onEnter={requireAuth}>
        <Route path="/" component={Dashboard} />
        <Route path="/logout" onEnter={forceLogout} />
      </Route>
    </Route>
  );
}
