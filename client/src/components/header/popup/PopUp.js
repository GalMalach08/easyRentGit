import React from "react";
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Utils
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Avatar from "@mui/material/Avatar";

import "./style.css";
const PopUp = () => {
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  return (
    <Popup
      trigger={
        <Avatar
          alt="Remy Sharp"
          style={{
            cursor: "pointer",
            backgroundColor: "#D9952C",
            margin: "0px",
          }}
        >
          {" "}
          {user.firstname[0]}
        </Avatar>
      }
      style={{ backgroundColor: "" }}
      position={dir === "rtl" ? "bottom right" : "bottom left"}
    >
      <Card
        sx={{ minWidth: 193, minHeight: 176 }}
        className="popup_flexbox"
        style={{
          backgroundColor: "#fafaf8",
        }}
      >
        <CardContent className="popup_flexbox">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Avatar style={{ cursor: "pointer", backgroundColor: "#D9952C" }}>
              {user.firstname[0]}
            </Avatar>
          </Typography>
          <Typography></Typography>
          <Typography sx={{ mb: 1.5 }}>
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </CardContent>

        <CardActions>
          <Link to={`/logout`} className="nav_link" activeclassname="selected">
            <Button style={{ color: "black" }} variant="outline-secondary">
              {dir === "rtl" ? "התנתק" : "Logout"}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Popup>
  );
};

export default PopUp;
