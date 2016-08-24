const initialState = {
  isAuthenticated: !!localStorage.getItem('id_token'),
  isLoadingProfile: false,
  idToken: localStorage.getItem('id_token'),
  profile: null,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH0_LOGIN_SUCCESS':
      return { ...state, idToken: action.idToken, isAuthenticated: true, error: null };

    case 'AUTH0_LOGIN_FAILURE':
      return { ...state, idToken: null, isAuthenticated: false, error: action.error };

    case 'AUTH0_LOGOUT_SUCCESS':
      return { ...state, idToken: null, isAuthenticated: false, error: null, profile: null };

    case 'AUTH0_GET_PROFILE_REQUEST':
      return { ...state, isLoadingProfile: true, profile: null };

    case 'AUTH0_GET_PROFILE_SUCCESS':
      return { ...state, isLoadingProfile: false, profile: action.profile };

    default:
      return state;
  }
}

export default session;
