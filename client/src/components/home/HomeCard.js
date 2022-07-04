import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomeCard = ({ item: { id, title, body, image } }) => {
  const navigate = useNavigate();
  return (
    <div
      className="styled_card"
      onClick={() => navigate(`${id === 1 ? "/5" : "/15"}`)}
    >
      <div>
        <h2>{title}</h2>
        <p style={{ lineHeight: "2" }}>{body}</p>
      </div>
      <div></div>
      <img src={image} alt={image} />
    </div>
  );
};

export default HomeCard;
