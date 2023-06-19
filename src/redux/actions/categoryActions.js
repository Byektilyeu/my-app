import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes/index";

export const loadCategories = () => {
  return function (dispatch) {
    //Zahialgiig tataj ehellee gedgiig medegdene
    // Eniig huleej avaad spinner ajillaj ehelne
    dispatch(loadCategoriesStart());

    axios
      .post(`${SERVERAPI}/api/v1/categories`, {
        objID: 992500001,
      })
      .then((response) => {
        const loadedCategories = response.data.data;
        // console.log(response.data.data);
        dispatch(loadCategoriesSuccess(loadedCategories));
      })
      .catch((err) => dispatch(loadCategoriesError(err)));
  };
};

export const loadCategoriesStart = () => {
  return {
    type: "LOAD_CATEGORIES_START",
  };
};

export const loadCategoriesSuccess = (loadedCategories) => {
  return {
    type: "LOAD_CATEGORIES_SUCCESS",
    loadedCategories,
  };
};

export const loadCategoriesError = (error) => {
  return {
    type: "LOAD_CATEGORIES_ERROR",
    error,
  };
};
