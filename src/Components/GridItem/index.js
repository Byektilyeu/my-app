import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { AddCart } from "../../redux/actions/CartActions";
import "./style.css";
import ToastContainer, { toast } from "react-light-toast";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const GridItem = (props) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const addToCart = () => {
    props.AddCart(props.item);
    // toast.success("to create");
    toast.success("Амжилттай нэмэгдлээ", {
      autoClose: true, // disable auto close | default: true
      closeDuration: 1500, // close duration in ms | default: 3000
    });

    // setAlertShow(true);
  };
  return (
    <div>
      <div id="grid">
        <div className="genname0450">
          <p>{props.Name}</p>
        </div>
        <div className="grid-img">
          {props.Comment ? (
            <img src={props.Comment} />
          ) : (
            <div className="no-img"></div>
          )}
          <p>{props.Price / 100}₮</p>
        </div>

        <div onClick={toggleShow} className="grid-text">
          <p>Дэлгэрэнгүй</p>
        </div>
        <div onClick={addToCart} className="grid-text">
          <p>Add Cart</p>
        </div>

        <ToastContainer
          options={{
            reverse: true,
            position: "top-left",
          }}
        />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.genname0450}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>{props.gendescription0450}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="success" onClick={toggleShow}>
                Хаах
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    AddCart: (item) => dispatch(AddCart(item)),
  };
}

export default connect(null, mapDispatchToProps)(GridItem);
