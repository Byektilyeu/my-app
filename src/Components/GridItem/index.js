import menuKfc from "../../Assets/kfc.png";
import React, { useState } from "react";
import "./style.css";

export default ({
  Comment,
  AltName,
  Name,
  Price,
  gendescription0450,
  genname0450,
}) => {
  return (
    <div id="grid">
      <div className="genname0450">
        <p>{genname0450}</p>
      </div>
      <div className="grid-img">
        <img src={Comment ? Comment : menuKfc} alt="Card image" />
        <p>{Price / 100}₮</p>
      </div>
      <div className="grid-text">
        <p>{AltName}</p>
      </div>
    </div>
  );
};
