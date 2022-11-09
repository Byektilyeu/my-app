import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import MyNavbar from "../../Components/Navbar";
import { SERVERAPI } from "../../Constants/Routes";
import axios from "axios";

function HomePage(props) {
  const [categories, setCategories] = useState([]);
  const [categ, setCateg] = useState([]);

  useEffect(() => {
    getCategories();
    getCategMenu(1000083);
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

  return (
    <Layout>
      <div>
        <MyNavbar />
        <hr />
        <div>cards beka </div>
      </div>
    </Layout>
  );
}

export default HomePage;
