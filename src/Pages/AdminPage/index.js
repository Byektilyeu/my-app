import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import AdminNavbar from "../../Components/AdminNavbar";
import { SERVERAPI } from "../../Constants/Routes";
import { useHistory } from "react-router-dom";

function AdminPage(props) {
  const history = useHistory();
  const [token, setToken] = useState(false);
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("qrMenuToken");
    if (tokenLocalStorage != null) {
      setToken(true);
      // console.log("admin page localStorage token: ", tokenLocalStorage);
    } else {
      history.push("/admin");
    }
  }, []);

  // console.log("jjj", props.user);
  // const history = useHistory();
  // const handleLogout = () => {
  //   localStorage.removeItem("qrMenuToken");
  //   // history.push("/admin");
  //   console.log("logged out");

  //   document.cookie =
  //     "qrmenu-token=; expires=" +
  //     new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);

  //   axios
  //     .get(`users/logout`)
  //     .then((result) => history.push("/admin"))
  //     .catch((err) => console.log(err));
  // };
  return <div>{token && <AdminNavbar />}</div>;
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(AdminPage);
