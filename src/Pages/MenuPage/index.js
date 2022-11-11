import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import MenuNavbar from "../../Components/MenuNavbar/index";
import { SERVERAPI } from "../../Constants/Routes";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import back from "../../Assets/back.png";
import GridItem from "../../Components/GridItem/index";
import { useHistory } from "react-router-dom";
import "./style.css";

function MenuPage(props) {
  let history = useHistory();
  const [categories, setCategories] = useState([]);
  const [categ, setCateg] = useState([]);
  var categID = props.location.hash.replace("#", "");
  console.log("categID========================", categID);

  useEffect(() => {
    getCategories();
    getCategMenu(categID);
    console.log(
      "props.params =========>>>>>>>>>>>>>>>>>>>>",
      props.location.hash
    );
  }, [categID]);

  const getCategories = () => {
    axios
      .get(`${SERVERAPI}/api/v1/categories`)
      .then((result) => {
        setCategories(result.data.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  };

  const getCategMenu = (catID) => {
    axios
      .post(`${SERVERAPI}/api/v1/category`, {
        category: catID,
      })
      .then((result) => {
        setCateg(result.data.data);
        console.log("data", result.data.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  };

  const setHash = (ident) => {
    window.location.hash = `#${ident}`;
  };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav-m">
            <MenuNavbar title="Рестораны меню" back={back} />
            {/* <button onClick={history.goBack}>hahahha</button> */}
            <div className="nav-menu">
              {categories.map((el) => (
                <div onClick={() => setHash(el.Ident)} className="btn ">
                  <p>{el.Name}</p>
                </div>
              ))}
            </div>
          </div>
        </header>
        <div className="container1">
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

        {/* <div className="container">
          <div className="item">
            {categ.map((el) => (
              <p>{el.AltName}</p>
            ))}
          </div>
        </div> */}
      </Layout>
    </div>
  );
}

export default MenuPage;
