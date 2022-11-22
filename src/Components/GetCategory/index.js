import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { SERVERAPI } from "../../Constants/Routes";
import GridItem from "../GridItem";
import "./style.css";

function GetCategory(props) {
  const [categ, setCateg] = useState([]);
  var el = useRef();
  // var categID = props.location.hash.replace("#", "");
  // console.log("hash________________________________________", props);

  useEffect(() => {
    getCategMenu();
  }, []);

  const getCategMenu = () => {
    axios
      .post(`${SERVERAPI}/api/v1/category`, {
        category: props.data.Ident,
      })
      .then((result) => {
        setCateg(result.data.data);
        if (props.selectedCategoryId == props.data.Ident)
          el.current.scrollIntoView();
        console.log("ahhcjahbchbhac", result.data.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  };

  return (
    <div className="card-datas" ref={el}>
      <p>{props.data.Name}</p>
      <hr style={{ height: "2px" }} />
      <Row>
        {categ.map((el) => (
          <Col xs="6" className="col" key={el.Code}>
            <GridItem
              Comment={el.Comment}
              AltName={el.AltName}
              Name={el.Name}
              Price={el.priceOrderMenu}
              gendescription0450={el.gendescription0450}
              genname0450={el.genname0450}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GetCategory;
