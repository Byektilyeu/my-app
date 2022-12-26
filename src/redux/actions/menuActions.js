import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes/index";

export const loadMenu = () => {
  return async function (dispatch) {
    //Zahialgiig tataj ehellee gedgiig medegdene
    // Eniig huleej avaad spinner ajillaj ehelne
    dispatch(loadMenuStart());

    axios
      .get(`${SERVERAPI}/api/v1/menu`)
      .then((response) => {
        const loadedMenu = response.data.data;
        // console.log(response.data.data);
        dispatch(loadMenuSuccess(loadedMenu));
      })
      .catch((err) => dispatch(loadMenuError(err)));
  };
};

export const loadMenuStart = () => {
  return {
    type: "LOAD_MENU_START",
  };
};

export const loadMenuSuccess = (loadedMenu) => {
  return {
    type: "LOAD_MENU_SUCCESS",
    loadedMenu,
  };
};

export const loadMenuError = (error) => {
  return {
    type: "LOAD_MENU_ERROR",
    error,
  };
};
