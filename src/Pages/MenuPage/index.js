import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import MenuNavbar from "../../Components/MenuNavbar/index";
import back from "../../Assets/back.png";
import basket from "../../Assets/basket6.jpg";
import "./style.css";
import * as actionsCategory from "../../redux/actions/categoryActions";
import * as actionsMenu from "../../redux/actions/menuActions";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import GridItem from "../../Components/GridItem/index";

function MenuPage(props) {
  var categID = props.location.hash.replace("#", "");
  const [alState, setAlState] = useState(false);

  // setAlState(props.alertState);

  useEffect(() => {
    // props.loadCategories();
    // props.loadMenu();
    console.log(props.alertState);
  }, [props.alertState]);

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

            <Link
              to={`/${props.match.params.hallplansid}/${props.match.params.tableid}/basket`}
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
                <Row>
                  {props.loadedMenu.map(
                    (el) =>
                      el.mainParentIdent === category.Ident && (
                        <Col xs="6" className="col" key={el.Code}>
                          <GridItem
                            item={el}
                            Comment={el.Comment}
                            AltName={el.AltName}
                            Name={el.Name}
                            Price={el.priceOrderMenu}
                            gendescription0450={el.gendescription0450}
                            genname0450={el.genname0450}
                          />
                        </Col>
                      )
                  )}
                </Row>
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
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadCategories: () => dispatch(actionsCategory.loadCategories()),
//     loadMenu: () => dispatch(actionsMenu.loadMenu()),
//   };
// };

export default connect(mapStateToProps)(MenuPage);
