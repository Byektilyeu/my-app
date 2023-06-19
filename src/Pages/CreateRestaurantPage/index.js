import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";
import { MDBListGroup, MDBListGroupItem, MDBSpinner } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function ResListPage(props) {
  const [restaurant, setRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [loading]);

  // get restaurants
  const getRestaurants = () => {
    axios
      .post(`${SERVERAPI}/api/v1/restaurants/getrestaurants`)
      .then((result) => {
        setRestaurants(result.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err.message));
  };

  //create restaurant req
  const createRestaurant = async () => {
    setLoading(false);
    const configCreateRestaurant = {
      method: "post",
      url: `${SERVERAPI}/api/v1/restaurants/createrestaurant`,
      data: {
        name: restaurant.name,
        ID: restaurant.ID,
        objID: restaurant.objID,
      },
    };
    setLoading(true);
    let restaurantresponse = await axios(configCreateRestaurant);
    console.log("createRestaurant ====> ", restaurantresponse.data.data);
  };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav">
            <MyNavbar title="Restaurants" />
          </div>
        </header>

        {loading ? (
          <div className="resList">
            <MDBListGroup light>
              {restaurants.map((data, i) => (
                <Link
                  key={data.objID}
                  to={`createrestaurant/${data.objID}/settings`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MDBListGroupItem
                    action
                    color="light"
                    className="px-3 rounded-3 mb-2"
                  >
                    {i + 1}: {data.objID}. {data.name}
                  </MDBListGroupItem>
                </Link>
              ))}
            </MDBListGroup>
          </div>
        ) : (
          <MDBSpinner className="spinner" color="success" />
        )}

        <div className="formRes">
          <div className="input">
            <input
              type="text"
              name="Name"
              value={restaurant.name}
              placeholder="Name"
              onChange={checkName}
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="ID"
              value={restaurant.ID}
              placeholder="ID"
              onChange={checkID}
            />
          </div>
          <div className="input">
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
