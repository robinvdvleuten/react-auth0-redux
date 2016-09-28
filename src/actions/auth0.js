import auth0 from '../services/auth0';

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

      if (state.auth0.profile) {
        // Do not load profile if it already exists in state.
        return resolve();
      }

      dispatch({ type: 'AUTH0_GET_PROFILE_REQUEST' });

      auth0.getProfile(state.auth0.idToken, (err, profile) => {
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
