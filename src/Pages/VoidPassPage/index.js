import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import PageFooter from "../../Components/footer/index";
import MyNavbar from "../../Components/Navbar";
import { connect } from "react-redux";
import axios from "axios";
import { SERVERAPI } from "../../Constants/Routes";

function VoidPassPage(props) {
  const [passOrders, setPassOrders] = useState([
    5, 3, 2, 4, 5, 8, 9, 0, 2, 3, 5, 7, 9, 12, 13, 14, 16,
  ]);

  //   useEffect(() => {
  //     // getPassOrders();
  //   }, []);

  //   //  get pass orders
  //   const getPassOrders = () => {
  //     axios
  //       .post(`${SERVERAPI}/api/v1/settings/getsettings`, {
  //         objID: parseInt(objectID),
  //       })
  //       .then((result) => {
  //         setLoading(true);
  //       })
  //       .catch((err) => console.log(err.message));
  //   };

  return (
    <Layout>
      <header>
        <div id="nav">
          <MyNavbar title="Баримтын жагсаалт" />
        </div>
      </header>
      <div className="mt-20">
        <div className="grid grid-cols-4 gap-2">
          {passOrders.map((i) => (
            <div className=" bg-lime-600 h-44 text-white p-2">
              <div className="grid grid-cols-2 gap-2 text-end">
                <div className="font-bold">273233</div>
                <div>2023.07.24 12:54</div>
                <div className="font-bold">57188/1</div>
                <div>7000.00</div>
                <div>Яармаг ПОС 1</div>
                <div>Alex</div>
                <div className="text-xs mt-8 ">45000.00 MNT</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(VoidPassPage);
