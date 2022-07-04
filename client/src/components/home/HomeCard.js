import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "./styles/Card.styled";
const HomeCard = ({ item: { id, title, body, image } }) => {
  const navigate = useNavigate();
  return (
    <StyledCard onClick={() => navigate(`${id === 1 ? "/5" : "/15"}`)}>
      <div>
        <h2>{title}</h2>
        <p style={{ lineHeight: "2" }}>{body}</p>
      </div>
      <div></div>
      <img src={image} alt={image} />
    </StyledCard>
  );
};

export default HomeCard;
