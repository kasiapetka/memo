import React from "react";
import "./Card.scss";

const Card = ({ image, actionHandler, isFlipped }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={actionHandler}
    >
      <div className="card__view card__view--front"></div>
      <div className="card__view card__view--back">
        <img src={image} alt="card" />
      </div>
    </div>
  );
};

export default Card;
