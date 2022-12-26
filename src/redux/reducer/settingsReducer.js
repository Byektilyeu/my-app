const initialState = {
  loadedSettings: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_SETTINGS_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_SETTINGS_SUCCESS":
      return {
        ...state,
        loading: true,
        loadedSettings: action.loadedSettings,
      };

    case "LOAD_SETTINGS_ERROR":
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
