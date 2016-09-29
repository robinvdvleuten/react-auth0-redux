import { getTokenExpirationDate } from '../utils/jwt';

const initialState = {
  error: null,
  idToken: null,
  profile: null,
};

export default function auth0 (state = initialState, action) {
  switch (action.type) {
    case 'AUTH0_LOGIN_SUCCESS':
      return { ...state, idToken: action.idToken, error: null };

    case 'AUTH0_LOGIN_FAILURE':
      return { ...state, idToken: null, error: action.err.message };

    case 'AUTH0_LOGOUT':
      return { ...state, idToken: null, error: null, profile: null };

    case 'AUTH0_GET_PROFILE_REQUEST':
      return { ...state, profile: null };

    case 'AUTH0_GET_PROFILE_FAILURE':
      if (action.err.error !== 401) {
        return state;
      }

      return { ...state, idToken: null, error: null };

    case 'AUTH0_GET_PROFILE_SUCCESS':
      return { ...state, profile: action.profile };

    default:
      return state;
  }
}

export const isAuthenticated = (state) => state.idToken !== null;

export const isTokenExpired = (state) => {
  if (!state.idToken) {
    return true;
  }

  const date = getTokenExpirationDate(state.idToken);
  const offsetSeconds = 0;

  if (date === null) {
    return false;
  }

  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
};
