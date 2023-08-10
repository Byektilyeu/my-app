import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes/index";

export const loadShift = (objID) => {
  return async function (dispatch) {
    dispatch(loadShiftStart());

    axios
      .post(`${SERVERAPI}/api/v1/shifts/getshift`, { objID: objID })
      .then((response) => {
        const loadedShift = response.data.data[0];
        console.log("shift action ", response.data.data[0]);
        dispatch(loadShiftSuccess(loadedShift));
      })
      .catch((err) => dispatch(loadShiftError(err)));
  };
};

export const loadShiftStart = () => {
  return {
    type: "LOAD_SHIFT_START",
  };
};

export const loadShiftSuccess = (loadedShift) => {
  return {
    type: "LOAD_SHIFT_SUCCESS",
    loadedShift,
  };
};

export const loadShiftError = (error) => {
  return {
    type: "LOAD_SHIFT_ERROR",
    error,
  };
};
