import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import logoRes from "../../Assets/logoRes.png";
import CategoriesCard from "../../Components/CategoriesCard/index";
import "./style.css";
import { Link } from "react-router-dom";

import * as actionsCategory from "../../redux/actions/categoryActions";
import * as actionsMenu from "../../redux/actions/menuActions";
import * as actionsSettings from "../../redux/actions/settingsActions";
import * as actionShift from "../../redux/actions/shiftActions";
import { connect } from "react-redux";

function HomePage(props) {
  const objID = props.match.params.restaurantid;

  // Buh category, menu, settings-uudiig redux-aas load hiij bna
  useEffect(() => {
    props.loadCategories(objID);
    props.loadMenu(objID);
    props.loadSettings(objID);
    props.loadShift(objID);
  }, []);

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

        {props.loadedCategories.map((el, i) => (
          <Link
            key={i}
            to={`/${props.match.params.restaurantid}/${props.match.params.hallplansid}/${props.match.params.tableid}/menu#${el.Ident}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <CategoriesCard Comment={el.Comment} Name={el.Name} />
          </Link>
        ))}
      </Layout>
      <div id="foot">
        <PageFooter />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadedCategories: state.categoryReducer.loadedCategories,
    loading: state.categoryReducer.loading,
    loadedMenu: state.menuReducer.loadedMenu,
    loadedShift: state.shiftReducer.loadedShift,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: (data2) => dispatch(actionsCategory.loadCategories(data2)),
    loadMenu: (data1) => dispatch(actionsMenu.loadMenu(data1)),
    loadSettings: (data) => dispatch(actionsSettings.loadSettings(data)),
    loadShift: (data3) => dispatch(actionShift.loadShift(data3)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
