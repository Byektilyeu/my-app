import { Card } from "react-bootstrap";
import menuKfc from "../../Assets/kfc.png";
import more from "../../Assets/more.png";
import React, { useState } from "react";
import "./style.css";

export default ({ Comment, Name }) => {
  return (
    <div id="card">
      <div className="card-img">
        <img src={Comment ? Comment : menuKfc} alt="Card image" />
      </div>
      <div className="card-text">
        <p>{Name}</p>
      </div>
    </div>
  );
};
