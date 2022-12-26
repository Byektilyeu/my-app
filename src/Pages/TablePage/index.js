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

  useEffect(() => {
    getTables();
  }, []);

  const getTables = () => {
    // console.log(props.match.params.hallplansid);
    axios
      .post(`${SERVERAPI}/api/v1/hallplans/tables`, {
        hallPlansIdent: props.match.params.hallplansid,
      })
      .then((result) => {
        // console.log("tables data", result.data.data);
        setTable(result.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Layout>
      <hr />
      {table.map((e) => (
        <Link
          key={e.tablesIdent}
          to={`/${props.match.params.hallplansid}/${e.tablesIdent}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MDBCard
            shadow="0"
            border="secondary"
            background="white"
            className="mb-3"
          >
            <MDBCardHeader>{e.tablesIdent}</MDBCardHeader>
            <MDBCardBody className="text-secondary">
              <MDBCardTitle>{e.TablesName}</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </Link>
      ))}
    </Layout>
  );
}

export default TablePage;
