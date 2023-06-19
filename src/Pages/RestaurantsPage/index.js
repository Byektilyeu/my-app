import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import Layout from "../../Components/Layout";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  // get restaurnts request
  const getRestaurants = () => {
    axios
      .post(`${SERVERAPI}/api/v1/restaurants/getrestaurants`)
      .then((result) => {
        setRestaurants(result.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Layout>
      <hr />
      {restaurants.map((e, index) => (
        <Link
          key={index}
          to={`/${e.objID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MDBCard
            shadow="0"
            border="secondary"
            background="white"
            className="mb-3"
          >
            <MDBCardHeader>Object ID: {e.objID}</MDBCardHeader>
            <MDBCardBody className="text-secondary">
              <MDBCardTitle>Restaurant: {e.name} </MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </Link>
      ))}
    </Layout>
  );
}

export default Restaurants;
