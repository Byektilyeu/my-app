import menuKfc from "../../Assets/kfc.png";
import React from "react";
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
