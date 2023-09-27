import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { SERVERAPI } from "../../Constants/Routes";

export default class Register extends Component {
  state = {
    username: null,
    password: null,
    objID: null,
    error: null,
    loading: false,
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
      .post(`${SERVERAPI}/api/v1/users/register`, {
        username: this.state.username,
        password: this.state.password,
        objID: this.state.objID,
        role: "admin",
      })
      .then((result) => {
        this.setState({ loading: false });
        // this.props.id(result.data.user._id);
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", result.data.user);
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
        {/* {document.cookie && <Redirect to="/" />} */}
        {this.state.loading && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 20 }}
          >
            Та түр хүлээнэ үү <Spinner animation="border" />
          </div>
        )}
        {/* <UserProfile id={this.state.id} /> */}
        <div class="row" style={{ marginTop: 50 }}>
          <div class="col-md-4"></div>
          <div class="col-md-4 bg-light">
            <div class="login align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 col-xl-10 mx-auto">
                    <h3 class="display-5 text-center">Бүртгүүлэх хуудас</h3>
                    <p class="text-muted mb-4"></p>
                    <div class="mb-4">
                      <input
                        type="text"
                        name="username"
                        placeholder="Нэвтрэх нэр"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Нууц үг"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="text"
                        name="objID"
                        placeholder="Object ID"
                        onChange={this.handleType}
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      />
                    </div>
                    <div class="d-grid gap-2 mt-2">
                      <button
                        type="submit"
                        onClick={this.handleClick}
                        className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                      >
                        Бүртгүүлэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
