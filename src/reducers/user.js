const initialState = {
  error: null,
  isLoadingProfile: false,
  profile: null,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH0_LOGOUT_SUCCESS':
      return { ...state, idToken: null, error: null, profile: null };

    case 'AUTH0_GET_PROFILE_REQUEST':
      return { ...state, isLoadingProfile: true, profile: null };

    case 'AUTH0_GET_PROFILE_FAILURE':
      return { ...state, error: action.err };

    case 'AUTH0_GET_PROFILE_SUCCESS':
      return { ...state, isLoadingProfile: false, profile: action.profile };

    default:
      return state;
  }
}

export default session;
