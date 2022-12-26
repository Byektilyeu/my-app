import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import logoRes from "../../Assets/logoRes.png";
import Card from "../../Components/card/index";
import "./style.css";
import { Link } from "react-router-dom";

import * as actionsCategory from "../../redux/actions/categoryActions";
import * as actionsMenu from "../../redux/actions/menuActions";
import * as actionsSettings from "../../redux/actions/settingsActions";
import { connect } from "react-redux";

function HomePage(props) {
  useEffect(() => {
    props.loadCategories();
    props.loadMenu();
    props.loadSettings();
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

const mapStateToProps = (state) => {
  return {
    loadedCategories: state.categoryReducer.loadedCategories,
    loading: state.categoryReducer.loading,
    loadedMenu: state.menuReducer.loadedMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(actionsCategory.loadCategories()),
    loadMenu: () => dispatch(actionsMenu.loadMenu()),
    loadSettings: () => dispatch(actionsSettings.loadSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
