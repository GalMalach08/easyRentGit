import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const LanguageAvatar = ({ changeSiteLanguage }) => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <>
      <Badge
        className="badge"
        overlap="circular"
        onClick={() => changeSiteLanguage("en")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar
            style={{
              background: "white",
              color: "black",
              fontSize: "15px",
              margin: "0px 5px",
              width: "20px",
              height: "20px",
            }}
            alt="Remy Sharp"
          >
            {" "}
            en
          </SmallAvatar>
        }
      >
        <Avatar src="https://c8.alamy.com/zooms/9/1ad2ee57b529409d8232e38e83090706/2g02jce.jpg"></Avatar>
      </Badge>

      <Badge
        className="badge"
        onClick={() => changeSiteLanguage("he")}
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar
            style={{
              background: "white",
              color: "black",
              fontSize: "15px",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            alt="Remy Sharp"
          >
            {" "}
            עב
          </SmallAvatar>
        }
      >
        <Avatar src="https://image.shutterstock.com/image-illustration/3d-flag-israel-on-avatar-260nw-1926569294.jpg"></Avatar>
      </Badge>
    </>
  );
};

export default LanguageAvatar;
