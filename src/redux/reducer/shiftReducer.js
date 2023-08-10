const initialState = {
  loadedShift: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_SHIFT_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_SHIFT_SUCCESS":
      return {
        ...state,
        loading: true,
        loadedShift: action.loadedShift,
      };

    case "LOAD_SHIFT_ERROR":
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
