import React, { useState } from "react";
import "./style.css";
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

const GridItem = ({
  Comment,
  AltName,
  Name,
  Price,
  gendescription0450,
  genname0450,
}) => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  return (
    <div>
      <div id="grid">
        <div className="genname0450">
          <p>{genname0450}</p>
        </div>
        <div className="grid-img">
          {Comment ? <img src={Comment} /> : <div className="no-img"></div>}
          <p>{Price / 100}₮</p>
        </div>

        <div onClick={toggleShow} className="grid-text">
          <p>Дэлгэрэнгүй</p>
        </div>
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{genname0450}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>{gendescription0450}</p>
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

export default GridItem;
