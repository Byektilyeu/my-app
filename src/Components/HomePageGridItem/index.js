import { Card } from "react-bootstrap";
import menuKfc from "../../Assets/kfc.png";
import more from "../../Assets/more.png";
import React, { useState } from "react";

export default ({ Comment, AltName, Name, Price, gendescription0450 }) => {
  const [buttonState, setButtonState] = useState(true);

  const description = () => {
    setButtonState(buttonState ? false : true);
  };

  return (
    <Card className={`fj-card`}>
      <div className="card-body-wrapper">
        <div className="view-overlay">
          <div className="card-more">
            <button onClick={description} className="card-more-btn">
              <img src={more} width="30px" height="30px"></img>
            </button>
          </div>
          {buttonState == true ? (
            <Card.Img src={Comment ? Comment : menuKfc} alt="Card image" />
          ) : (
            <div className="card-description">{gendescription0450}</div>
          )}
        </div>
        <Card.Body className="card-texts">
          <Card.Text className="card-title">
            <p className="card-title-p">{AltName}</p>
          </Card.Text>
          <Card.Text>
            <p className="card-price">{Price / 100}₮</p>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};
