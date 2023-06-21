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

function TablePage(props) {
  const [table, setTable] = useState([]);
  console.log(props);

  useEffect(() => {
    getTables();
  }, []);

  // get tables -> mongoDb
  const getTables = () => {
    // console.log(props.match.params.hallplansid);
    axios
      .post(`${SERVERAPI}/api/v1/tables/db`, {
        objID: 992500001,
        hallPlansIdent: props.match.params.hallplansid,
      })
      .then((result) => {
        console.log("tables data", result.data.data);
        setTable(result.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Layout>
      <hr />
      {table.map((e, index) => (
        <Link
          key={index}
          to={`/${props.match.params.restaurantid}/${props.match.params.hallplansid}/${e.tableIdent}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MDBCard
            shadow="0"
            border="secondary"
            background="white"
            className="mb-3"
          >
            <MDBCardHeader>{e.tableIdent}</MDBCardHeader>
            <MDBCardBody className="text-secondary">
              <MDBCardTitle>{e.tableName}</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </Link>
      ))}
    </Layout>
  );
}

export default TablePage;
