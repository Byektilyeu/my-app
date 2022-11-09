import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { SERVERAPI } from "../../Constants/Routes";
import HomePageGridItem from "../HomePageGridItem";

function GetCategory(props) {
  const [categ, setCateg] = useState([]);
  const [id, setId] = useState(1000083);

  useEffect(() => {
    setId(props.data);
    getCategMenu();
  }, [id]);

  const getCategMenu = () => {
    axios
      .post(`${SERVERAPI}/api/v1/category`, {
        category: 1000118,
      })
      .then((result) => {
        setCateg(result.data.data);
        console.log("ahhcjahbchbhac", result.data.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  };

  return (
    <div className="card-datas">
      <p> tttttttt{props.data}</p>
      <Row>
        {categ.map((el, index) => (
          <Col xs="6" md="3" key={index} style={{ color: "black" }}>
            <HomePageGridItem
              Comment={el.Comment}
              AltName={el.AltName}
              Name={el.Name}
              Price={el.menuPriceValue}
              Instruct={el.Instruct}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GetCategory;
