import React, { useEffect, useRef } from "react";

import { Row, Col } from "react-bootstrap";
import GridItem from "../GridItem/index";
import "./style.css";

import * as actionsMenu from "../../redux/actions/menuActions";
import { connect } from "react-redux";

function GetCategory(props) {
  var el = useRef();

  useEffect(() => {
    props.loadMenu();
    if (props.selectedCategoryId == props.data.Ident)
      el.current.scrollIntoView();
  }, []);

  return (
    <div className="card-datas" ref={el}>
      <p>{props.data.Name}</p>
      <hr style={{ height: "2px" }} />

      <Row>
        {props.loadedMenu.map(
          (el) =>
            el.mainParentIdent === props.data.Ident && (
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
            )
        )}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadedMenu: state.menuReducer.loadedMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenu: () => dispatch(actionsMenu.loadMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCategory);
