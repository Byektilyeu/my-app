import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes/index";

export const loadSettings = () => {
  return async function (dispatch) {
    dispatch(loadSettingsStart());

    axios
      .get(`${SERVERAPI}/api/v1/settings`)
      .then((response) => {
        const loadedSettings = response.data.data;
        // console.log(response.data.data);
        dispatch(loadSettingsSuccess(loadedSettings));
      })
      .catch((err) => dispatch(loadSettingsError(err)));
  };
};

export const loadSettingsStart = () => {
  return {
    type: "LOAD_SETTINGS_START",
  };
};

export const loadSettingsSuccess = (loadedSettings) => {
  return {
    type: "LOAD_SETTINGS_SUCCESS",
    loadedSettings,
  };
};

export const loadSettingsError = (error) => {
  return {
    type: "LOAD_SETTINGS_ERROR",
    error,
  };
};
