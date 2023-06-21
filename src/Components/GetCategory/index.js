import React, { useEffect, useRef } from "react";

import { Row, Col } from "react-bootstrap";
import GridItem from "../GridItem/index";
import "./style.css";

import * as actionsMenu from "../../redux/actions/menuActions";
import { connect } from "react-redux";

function GetCategory(props) {
  var el = useRef();

  useEffect(() => {
    if (props.selectedCategoryId == props.ident) el.current.scrollIntoView();
  }, []);

  return (
    <div className="card-datas" ref={el}>
      <Row>
        {props.loadedMenu.map(
          (el) =>
            el.mainParentIdent === props.ident && (
              <Col xs="6" className="col" key={el.Code}>
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
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadedMenu: state.menuReducer.loadedMenu,
  };
};

export default connect(mapStateToProps)(GetCategory);
