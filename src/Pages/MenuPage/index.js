import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import MenuNavbar from "../../Components/MenuNavbar/index";
import back from "../../Assets/back.png";
import basket from "../../Assets/basket6.jpg";
import "./style.css";
import { connect } from "react-redux";
import { SERVERAPI } from "../../Constants/Routes";
import { setGuidAction } from "../../redux/actions/guidActions";

import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import GridItem from "../../Components/GridItem/index";
import axios from "axios";
import GetCategory from "../../Components/GetCategory";

function MenuPage(props) {
  var categID = props.location.hash.replace("#", "");
  console.log("props location: ", props.location.hash);

  useEffect(() => {
    if (props.loadedGuid == null) {
      // createOrderRequest();
    }
    // props.loadCategories();
    // props.loadMenu();
    console.log(props.alertState);
    console.log("loaded menu", props.loadedMenu);
  }, [props.alertState]);

  // ***************createOrderRequest******************

  const createOrderRequest = async () => {
    // const tableID = props.match.params.tableid;
    const tableID = "1000478";
    const stationID = "15002";
    const waiterID = "1000007";
    const orderType = "2";

    const configCreateOrderRequest = {
      method: "post",
      url: `${SERVERAPI}/api/v1/rkeeper/createorder`,
      data: {
        tableID: tableID,
        stationID: stationID,
        waiterID: waiterID,
        orderType: orderType,
      },
    };

    let createOrderResult = await axios(configCreateOrderRequest);

    const obj = JSON.parse(createOrderResult.data.data);
    console.log("create order result ======> ", obj);
    const orderGuid = obj.RK7QueryResult.Order._attributes.guid;
    const orderVisit = obj.RK7QueryResult.Order._attributes.visit;
    const orderNumberGuid =
      obj.RK7QueryResult.Order.ExternalProps.Prop._attributes.name;
    console.log("orderNumberGuid ==> ", orderNumberGuid);
    var orderNumber = null;
    if (orderNumberGuid === "{7DC7AF79-1D00-4573-BE8A-A02C6FA3B430}") {
      orderNumber =
        obj.RK7QueryResult.Order.ExternalProps.Prop._attributes.value;
    } else {
      console.log(
        "Aldaa garlaa: OrderNumberGuid baihgui esvel create order-oos utgiig ni avah ued aldaa garsan bna !!!!!!!!!!!!!!!"
      );
    }

    props.setGuidAction(orderGuid, orderVisit, orderNumber);
  };

  return (
    <div>
      <Layout>
        <header>
          <div id="nav-m">
            <MenuNavbar
              title="Рестораны меню"
              back={back}
              restaurant={props.match.params.restaurantid}
              hallplan={props.match.params.hallplansid}
              table={props.match.params.tableid}
            />

            <Link
              to={`/${props.match.params.restaurantid}/${props.match.params.hallplansid}/${props.match.params.tableid}/basket`}
            >
              <div className="basket">
                <img src={basket}></img>
                <p>{props.cartNumber}</p>
              </div>
            </Link>

            <div className="nav-menu">
              {props.loadedCategories.map((el, i) => (
                <div key={i} className="btn">
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
            {props.loadedCategories.map((category, i) => (
              <div key={i} className="menu-body" id={category.Ident}>
                <p>{category.Name}</p>
                <hr style={{ height: "2px" }} />
                <GetCategory
                  selectedCategoryId={categID}
                  ident={category.Ident}
                />
                {/* <Row>
                  {props.loadedMenu.map(
                    (el, index) =>
                      el.mainParentIdent === category.Ident && (
                        <Col xs="6" className="col" key={index}>
                          <GridItem
                            item={el}
                            Comment={el.comment}
                            AltName={el.altName}
                            Name={el.genname0409}
                            Price={el.priceOrderMenu}
                            // gendescription0450={el.gendescription0450}
                            genname0450={el.genname0450}
                          />
                        </Col>
                      )
                  )}
                </Row> */}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(" state all ", state);
  return {
    loadedCategories: state.categoryReducer.loadedCategories,
    loading: state.categoryReducer.loading,
    loadedMenu: state.menuReducer.loadedMenu,
    itemsCart: state.cartReducer.Carts,
    alertState: state.cartReducer.alertState,
    cartNumber: state.cartReducer.numberCart,
    loadedGuid: state.guidReducer.guid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGuidAction: (guid, orderVisit, orderNumber) =>
      dispatch(setGuidAction(guid, orderVisit, orderNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
