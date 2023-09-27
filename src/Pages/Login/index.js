import React, { Component } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Rkeeper from "../../Assets/rkeeper.webp";
import { SERVERAPI } from "../../Constants/Routes";
import { connect } from "react-redux";
import { setUserAction } from "../../redux/actions/userActions";
import { loadShift } from "../../redux/actions/shiftActions";
import { loadSettings } from "../../redux/actions/settingsActions";

class Login extends Component {
  state = {
    username: null,
    password: null,
    role: null,
    objID: null,
    error: null,
    loading: false,
    isLoggedIn: false,
  };

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      error: null,
    });
  };

  handleClick = () => {
    this.setState({ loading: true });
    axios
      .post(`users/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        this.setState({ loading: false });
        /// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.props.onLogin(result.data.token);
        this.props.setUserAction(result.data.user);
        this.setState({ role: result.data.user.role });
        this.props.loadShift(result.data.user.objID);
        this.setState({ objID: result.data.user.objID });
        this.setState({ isLoggedIn: true });
        this.props.loadSettings(result.data.user.objID);
        // this.props.id(result.data.user._id);
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", result.data.user.objID);
      })
      .catch((err) =>
        this.setState({
          loading: false,
          error: err,
        })
      );
  };

  render() {
    return (
      <div>
        {/* {document.cookie && <Redirect to="/admin" />} */}
        {this.state.isLoggedIn && this.state.role === "manager" && (
          <Redirect to={`/admin/${this.state.objID}`} />
        )}
        {this.state.isLoggedIn && this.state.role === "admin" && (
          <Redirect to={`/admin/login`} />
        )}
        {this.state.loading && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 20 }}
          >
            Та түр хүлээнэ үү <Spinner animation="border" />
          </div>
        )}

        <section className="relative pt-8 md:py-16 bg-white">
          <div className="container">
            <div className="w-full md:w-3/5 lg:w-1/2">
              <div className="max-w-sm mx-auto">
                <div className="mb-6 text-center">
                  <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                    Нэвтрэх хуудас
                  </h3>
                  <p className="text-lg text-coolGray-500 font-medium">
                    Та нэвтрэх нэр болон нууц үгээ оруулна уу
                  </p>
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-coolGray-800 font-medium"
                    htmlFor=""
                  >
                    Нэвтрэх нэр
                  </label>
                  <input
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    name="username"
                    placeholder="Нэвтрэх нэр"
                    onChange={this.handleType}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-coolGray-800 font-medium"
                    htmlFor=""
                  >
                    Нууц үг
                  </label>
                  <input
                    className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="password"
                    name="password"
                    placeholder="Нууц үг"
                    onChange={this.handleType}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between mb-6"></div>
                <button
                  type="submit"
                  onClick={this.handleClick}
                  className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                >
                  Нэвтрэх
                </button>

                <p className="text-center">
                  <span className="text-xs font-medium">
                    Та бүртгэлгүй бол?
                  </span>
                  <a
                    className="inline-block text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline"
                    href=""
                  >
                    R-Keeper-т хандана уу?
                  </a>
                </p>
              </div>
            </div>
          </div>
          <img
            className="md:absolute md:top-10 md:right-10 mx-auto md:h-3/4 md:w-2/4 lg:w-2/4 md:object-cover"
            src={Rkeeper}
            alt=""
          />
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserAction: (user) => dispatch(setUserAction(user)),
    loadShift: (objID) => dispatch(loadShift(objID)),
    loadSettings: (objID) => dispatch(loadSettings(objID)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
