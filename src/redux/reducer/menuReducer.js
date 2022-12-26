const initialState = {
  loadedMenu: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_MENU_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_MENU_SUCCESS":
      return {
        ...state,
        loading: true,
        loadedMenu: action.loadedMenu,
      };

    case "LOAD_MENU_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default reducer;
