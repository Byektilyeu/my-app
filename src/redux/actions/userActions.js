import axios from "../../axios";
import { useHistory } from "react-router-dom";

export const setUserAction = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};

export const logout = () => {
  return function () {
    localStorage.removeItem("qrMenuToken");
    // history.push("/admin");
    console.log("logged out");

    document.cookie =
      "qrmenu-token=; expires=" +
      new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);

    axios
      .get(`users/logout`)
      .then((result) => {
        const history = useHistory();
        history.push("/admin");
      })
      .catch((err) => console.log(err));
  };
};
