import Auth0 from 'auth0-js';

const auth0 = new Auth0({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  callbackOnLocationHash: true
});

export const login = (options) => (
  (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      auth0.login(options, (err, result) => {
        if (err) {
          dispatch({ type: 'AUTH0_LOGIN_FAILURE', err });
          return reject(err);
        }

        dispatch({ type: 'AUTH0_LOGIN_SUCCESS', idToken: result.idToken });
        resolve();
      });
    });
  }
);

export const logout = () => (
  (dispatch, getState) => {
    dispatch({ type: 'AUTH0_LOGOUT' });
    return Promise.resolve();
  }
);

export const parseHash = (hash) => (
  (dispatch, getState) => {
    const result = auth0.parseHash(hash);

    if (!result) {
      return Promise.reject();
    }

    if (result.error) {
      dispatch({ type: 'AUTH0_LOGIN_FAILURE', err: result.error });
      return Promise.reject(result.error);
    }

    dispatch({ type: 'AUTH0_LOGIN_SUCCESS', idToken: result.idToken });
    return Promise.resolve();
  }
);

export const getProfile = () => (
  (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState();

      if (state.user.profile) {
        // Do not load profile if it already exists in state.
        return resolve();
      }

      dispatch({ type: 'AUTH0_GET_PROFILE_REQUEST' });

      auth0.getProfile(state.session.idToken, (err, profile) => {
        if (err) {
          dispatch({ type: 'AUTH0_GET_PROFILE_FAILURE', err });
          return reject(err);
        }

        dispatch({ type: 'AUTH0_GET_PROFILE_SUCCESS', profile });
        return resolve();
      });
    });
  }
)
