const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
