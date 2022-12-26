const initialState = {
  loadedCategories: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: true,
        loadedCategories: action.loadedCategories,
      };

    case "LOAD_CATEGORIES_ERROR":
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
