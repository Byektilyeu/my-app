const initialState = {
  loadedSettings: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  console.log("action settings : ", action.loadedSettings);
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

    case "SETSETTINGS":
      return {
        ...state,
        loading: true,
        loadedSettings: action.loadedSettings,
      };

    default:
      return state;
  }
};
export default reducer;
