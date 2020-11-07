import React from "react";

function Card(props) {
  return (
    <div
      style={{
        "background-image": `url(${props.imgUrl})`
      }}
      className="card"
    >
      <div className="card-info">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-description">{props.description}</p>
        <div className="card-waves" />
      </div>
    </div>
  );
}
export default Card;