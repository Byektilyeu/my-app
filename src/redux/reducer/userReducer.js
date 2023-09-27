var initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  console.log("action : ", action.user);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
export default reducer;
