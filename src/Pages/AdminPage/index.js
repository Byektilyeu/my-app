import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import MyNavbar from "../../Components/Navbar";
import { connect } from "react-redux";
import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar";

function AdminPage(props) {
  return <AdminNavbar />;
}

const mapStateToProps = (state) => {
  return {
    // loadedCategories: state.categoryReducer.loadedCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadCategories: () => dispatch(actionsCategory.loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
