import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import { SERVERAPI } from "../../Constants/Routes";
import axios from "axios";
import logoRes from "../../Assets/logoRes.png";
import Card from "../../Components/card/index";
import "./style.css";
import { Link } from "react-router-dom";
import MenuPage from "../MenuPage";

function HomePage(props) {
  const [categories, setCategories] = useState([]);
  // const [categ, setCateg] = useState([]);

  useEffect(() => {
    getCategories();
    // getCategMenu(1000083);
  }, []);

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

  // const getCategMenu = (catID) => {
  //   axios
  //     .post(`${SERVERAPI}/api/v1/category`, {
  //       category: catID,
  //     })
  //     .then((result) => {
  //       setCateg(result.data.data);
  //       console.log("data", result.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err.message);
  //     });
  // };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav">
            <MyNavbar title="Нүүр хуудас" />
          </div>
          <div className="logo">
            <img src={logoRes} alt="logo" />
            <p>"Restaurant name"</p>
          </div>
        </header>

        {categories.map((el, i) => (
          <Link
            key={i}
            to={`/${props.match.params.hallplansid}/${props.match.params.tableid}/menus#${el.Ident}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card Comment={el.Comment} Name={el.Name} />
          </Link>
        ))}
      </Layout>
      <div id="foot">
        <PageFooter />
      </div>
    </div>
  );
}

export default HomePage;
