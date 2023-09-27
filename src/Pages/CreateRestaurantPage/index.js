import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import AdminNavbar from "../../Components/AdminNavbar";
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBListGroup, MDBListGroupItem, MDBSpinner } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function ResListPage(props) {
  const [restaurant, setRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkName = (text) => {
    setRestaurant({ ...restaurant, name: text.target.value });
  };
  const checkID = (text) => {
    setRestaurant({ ...restaurant, ID: text.target.value });
  };
  const checkObjID = (text) => {
    setRestaurant({ ...restaurant, objID: text.target.value });
  };

  useEffect(() => {
    getRestaurants();
    // setLoading(false);
  }, [loading]);

  // get restaurants
  const getRestaurants = () => {
    axios
      .post(`${SERVERAPI}/api/v1/restaurants/getrestaurants`)
      .then((result) => {
        setRestaurants(result.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        // setError(true);
        toast.error(err.response.data.error.message);
      });
  };

  //create restaurant req
  const createRestaurant = () => {
    const token = localStorage.getItem("qrMenuToken");
    setLoading(false);
    axios
      .post(
        `${SERVERAPI}/api/v1/restaurants/createrestaurant`,
        {
          name: restaurant.name,
          ID: restaurant.ID,
          objID: restaurant.objID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result.data.data !== null) {
          console.log("createRestaurant ====> ", result.data.data);
          setLoading(true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Layout>
        <header>
          <div id="nav">
            <AdminNavbar />
          </div>
        </header>
        <div className="formRes">
          <div className="input-form">
            <input
              type="text"
              name="Name"
              value={restaurant.name}
              placeholder="Name"
              onChange={checkName}
            />
          </div>
          <div className="input-form">
            <input
              type="text"
              name="ID"
              value={restaurant.ID}
              placeholder="ID"
              onChange={checkID}
            />
          </div>
          <div className="input-form">
            <input
              type="text"
              name="ObjID"
              value={restaurant.objID}
              placeholder="Object ID"
              onChange={checkObjID}
            />
          </div>

          <div className="buttons">
            <div>
              <button onClick={createRestaurant} className="button">
                Үүсгэх
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="resList">
            <MDBListGroup light>
              {restaurants.map((data, i) => (
                <Link
                  key={data.objID}
                  to={`createrestaurant/${data.objID}/settings`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MDBListGroup horizontal horizontalSize="lg">
                    <MDBListGroupItem
                      action
                      color="light"
                      className="px-3  mb-2 "
                    >
                      № {i + 1}
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      action
                      color="light"
                      className="px-3  mb-2 "
                    >
                      Object ID: {data.objID}
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      action
                      color="light"
                      className="px-3 mb-2 "
                    >
                      Name: {data.name}
                    </MDBListGroupItem>
                  </MDBListGroup>
                  {/* <MDBListGroupItem
                    action
                    color="light"
                    className="px-3 rounded-3 mb-2 "
                  >
                    {i + 1}: {data.objID}. {data.name}
                  </MDBListGroupItem> */}
                </Link>
              ))}
            </MDBListGroup>
          </div>
        ) : (
          <MDBSpinner className="spinner" color="success" />
        )}
      </Layout>
      <div id="foot">
        <PageFooter />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // loadedCategories: state.categoryReducer.loadedCategories,
    // loading: state.categoryReducer.loading,
    // loadedMenu: state.menuReducer.loadedMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadCategories: () => dispatch(actionsCategory.loadCategories()),
    // loadMenu: () => dispatch(actionsMenu.loadMenu()),
    // loadSettings: () => dispatch(actionsSettings.loadSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResListPage);
