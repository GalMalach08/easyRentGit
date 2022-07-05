import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const LanguageAvatar = ({ changeSiteLanguage }) => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <>
      <Badge
        style={{
          margin: "0px 50px 0px 50px",
          cursor: "pointer",
        }}
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
        style={{ margin: "0px 15px", cursor: "pointer" }}
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
            }}
            alt="Remy Sharp"
          >
            {" "}
            he
          </SmallAvatar>
        }
      >
        <Avatar src="https://image.shutterstock.com/image-illustration/3d-flag-israel-on-avatar-260nw-1926569294.jpg"></Avatar>
      </Badge>
    </>
  );
};

export default LanguageAvatar;
