import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import MenuNavbar from "../../Components/MenuNavbar/index";
import { SERVERAPI } from "../../Constants/Routes";
import axios from "axios";
import back from "../../Assets/back.png";
import "./style.css";
import GetCategory from "../../Components/GetCategory";

///
function MenuPage(props) {
  // const myref = useRef(null);
  // let history = useHistory();
  const [categories, setCategories] = useState([]);
  // const [categ, setCateg] = useState([]);
  // const [hashData, setHashData] = useState("");
  var categID = props.location.hash.replace("#", "");
  console.log("categID========================", props);

  useEffect(() => {
    getCategories();
    // console.log(
    //   "props.params =========>>>>>>>>>>>>>>>>>>>>",
    //   props.location.hash
    // );
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

  // const setHash = (ident) => {
  //   window.location.hash = `#${ident}`;
  //   setHashData(ident);
  //   myref.current.scrollIntoView();
  // };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav-m">
            <MenuNavbar
              title="Рестораны меню"
              back={back}
              hallplan={props.match.params.hallplansid}
              table={props.match.params.tableid}
            />
            <div className="nav-menu">
              {categories.map((el) => (
                <div className="btn">
                  <a href={`#${el.Ident}`}>
                    <p>{el.Name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </header>
        <div className="container1">
          <div>
            {categories.map((category, i) => (
              <div className="menu-body" id={category.Ident}>
                <GetCategory
                  key={category.Ident}
                  data={category}
                  selectedCategoryId={categID}
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default MenuPage;
