import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes/index";

export const loadSettings = (objID) => {
  return async function (dispatch) {
    dispatch(loadSettingsStart());

    axios
      .post(`${SERVERAPI}/api/v1/settings/getsettings`, { objID: objID })
      .then((response) => {
        const loadedSettings = response.data.data[0];
        console.log("settngs action ", response.data.data[0]);
        dispatch(loadSettingsSuccess(loadedSettings));
      })
      .catch((err) => dispatch(loadSettingsError(err)));
  };
};

export const setSettingsData = (loadedSettings) => {
  return {
    type: "SETSETTINGS",
    loadedSettings,
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
