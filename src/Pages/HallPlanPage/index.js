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

function HallPlan(props) {
  const [hallplans, setHallplans] = useState([]);

  useEffect(() => {
    getHallPlans();
  }, []);

  //get hallplans request
  const getHallPlans = () => {
    axios
      .post(`${SERVERAPI}/api/v1/hallplans/db`, {
        objID: 992500001,
      })
      .then((result) => {
        setHallplans(result.data.data);
        console.log("hallplans data", result.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Layout>
      <hr />
      {hallplans.map((e, index) => (
        <Link
          key={index}
          to={`/${props.match.params.restaurantid}/${e.hallplansIdent}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MDBCard
            shadow="0"
            border="secondary"
            background="white"
            className="mb-3"
          >
            <MDBCardHeader>{e.hallplansIdent}</MDBCardHeader>
            <MDBCardBody className="text-secondary">
              <MDBCardTitle></MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </Link>
      ))}
    </Layout>
  );
}

export default HallPlan;
