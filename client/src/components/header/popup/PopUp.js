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

  return (
    <Popup
      trigger={
        <Avatar
          alt="Remy Sharp"
          sx={{ bgcolor: "#D9952C" }}
          style={{ cursor: "pointer" }}
        >
          {" "}
          {user.firstname[0]}
        </Avatar>
      }
      style={{ backgroundColor: " #202124" }}
      position="bottom right"
    >
      <Card
        sx={{ minWidth: 193, minHeight: 176 }}
        className="popup_flexbox"
        style={{
          backgroundColor: "#202124",
        }}
      >
        <CardContent className="popup_flexbox">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Avatar sx={{ bgcolor: "#D9952C" }}>{user.firstname[0]}</Avatar>
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }}>
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </CardContent>

        <CardActions>
          <Link to={`/logout`} className="nav_link" activeclassname="selected">
            <Button style={{ color: "white" }} variant="outline-secondary">
              התנתק
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Popup>
  );
};

export default PopUp;
