import React, { useState } from "react";
// React router dom
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../utils/tools";
// Components
import ShareModal from "./ShareModal";
import Carousel from "../caursel/Carusel";
// Material ui
import {
  Chip,
  Avatar,
  ListItemAvatar,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BusinessIcon from "@material-ui/icons/Business";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import UpdateIcon from "@material-ui/icons/Update";
import { Link } from "react-router-dom";
import ShareIcon from "@material-ui/icons/Share";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import EditIcon from "@material-ui/icons/Edit";
// Translator
import { useTranslation } from "react-i18next";
// Moment
import moment from "moment";
// Style
import "./style.css";

// Asset card - get used all over the site
const AssetCard = ({ asset, assetPage }) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [dense, setDense] = useState(false);
  const user = useSelector((state) => state.users.data);
  const navigate = useNavigate();
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  const chips = [
    { label: dir === "rtl" ? "מבוקש" : "most-wanted", color: "primary" },
    {
      label: asset.isSublet
        ? dir === "rtl"
          ? "סאבלט"
          : "Sublet"
        : dir === "rtl"
        ? "השכרה"
        : "Rent",
    },
  ];

  // Caculate how much time has passed from the asset's publish
  const updatedOn = (date) => {
    if (moment().diff(date, "days") === 0) {
      if (dir === "rtl") {
        return "עודכן היום";
      } else {
        return "updated today";
      }
    } else if (
      moment().diff(date, "days") < 6 &&
      moment().diff(date, "days") > 11
    ) {
      if (dir === "rtl") return "עודכן לפני כשבוע";
      else return "updated one week ago";
    } else if (moment().diff(date, "days") > 11) {
      if (dir === "rtl") return "עודכן לפני מעל לשבועיים";
      else return "updated more than 2 weeks ago";
    } else {
      if (dir === "rtl")
        return `עודכן לפני ${moment().diff(date, "days")} ימים`;
      else return `update before  ${moment().diff(date, "days")} days`;
    }
  };

  // Move to the edit asset page
  const editAsset = (e, asset) => {
    e.preventDefault();
    navigate(`/update/${asset._id}`, { state: { asset } });
  };

  // Open the share modal
  const openShareModalFn = (e) => {
    e.preventDefault();
    setOpenShareModal(true);
  };

  return (
    <>
      <Link to={`/asset/${asset._id}`}>
        <div
          className="contain"
          style={
            assetPage
              ? { cursor: "auto", width: "600px" }
              : { cursor: "cursor" }
          }
        >
          {/* Image Carusel */}
          <Carousel images={asset.images} assetPage={assetPage} />

          {/* Content */}
          <div className="asset_content">
            <List dense={dense}>
              {/* Price content */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon color="action" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <div className="asset_price">
                    <div style={{ display: "flex" }}>
                      <h3>₪{numberWithCommas(asset.price)}</h3>
                      <h3>
                        {dir === "rtl"
                          ? asset.pricePer
                          : asset.pricePer === "לכל התקופה"
                          ? "For all period"
                          : asset.pricePer === "לחודש"
                          ? "For month"
                          : asset.pricePer === "לשבוע"
                          ? "For week"
                          : asset.pricePer === "ליום"
                          ? "For day"
                          : null}
                      </h3>
                    </div>
                    <div className="asset_icons">
                      <span
                        className="share_icon"
                        onClick={(e) => openShareModalFn(e)}
                      >
                        <ShareIcon />
                      </span>
                      {(asset.userId === user._id ||
                        (assetPage && asset.userId._id === user._id)) && (
                        <>
                          <span
                            className="share_icon2"
                            onClick={(e) => editAsset(e, asset)}
                          >
                            <EditIcon />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </ListItemText>
              </ListItem>

              <div className="pair_items">
                {/* Address content */}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BusinessIcon color="action" />
                    </Avatar>{" "}
                  </ListItemAvatar>
                  <ListItemText>
                    <h6
                      className={
                        dir === "rtl" ? "asset_address_hebrew" : "asset_address"
                      }
                    >
                      {dir === "rtl" ? asset.address : asset.englishAddress}
                    </h6>
                  </ListItemText>
                </ListItem>

                {/* Rooms content */}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeWorkIcon color="action" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <div className="asset_price">
                      <p>
                        {asset.roomsNumber === "1"
                          ? `${t("oneroom.1")}`
                          : asset.roomsNumber === "חדר בדירת שותפים"
                          ? `${t("roomate.1")}`
                          : `${asset.roomsNumber} ${
                              dir === "rtl" ? "חדרים" : "rooms"
                            }`}
                      </p>
                    </div>
                  </ListItemText>
                </ListItem>
              </div>

              <div className="pair_items">
                {/* Date */}
                <ListItem style={{ paddingBottom: "0px" }}>
                  {" "}
                  <ListItemAvatar>
                    <Avatar>
                      <EventNoteIcon color="action" />{" "}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    {asset.isSublet ? (
                      <p
                        className={`${
                          dir === "rtl" ? "asset_enter_hebrew" : "asset_enter"
                        }`}
                      >
                        {asset.exitDate} - {asset.enterDate}
                      </p>
                    ) : (
                      <p
                        className={`${
                          dir === "rtl" ? "asset_enter_hebrew" : "asset_enter"
                        }`}
                      >
                        {dir === "rtl" ? "כניסה ב" : "enter in "}
                        {asset.enterDate}
                      </p>
                    )}
                  </ListItemText>
                </ListItem>
                {/* Update on */}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <UpdateIcon color="action" />{" "}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <p
                      className={`${
                        dir === "rtl" ? "asset_enter_hebrew" : "asset_enter"
                      }`}
                    >
                      {updatedOn(asset.updatedOn)}
                    </p>
                  </ListItemText>
                </ListItem>
              </div>
              {/* Notes */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SpeakerNotesIcon color="action" />{" "}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <p
                    className={`${
                      dir === "rtl" ? "asset_enter_hebrew" : "asset_enter"
                    }`}
                  >
                    {asset.notes
                      ? dir === "rtl"
                        ? asset.notes
                        : asset.englishNotes
                      : dir === "rtl"
                      ? "אין הערות"
                      : "No notes"}
                  </p>
                </ListItemText>
              </ListItem>
            </List>

            {/* Chips */}
            <p
              className={`${
                dir === "rtl" ? "asset_labels_hebrew" : "asset_labels"
              }`}
            >
              {chips.map((chip, i) => (
                <Chip
                  key={i}
                  size="small"
                  avatar={
                    <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                  }
                  label={chip.label}
                  color={chip.color}
                  className="chip"
                />
              ))}
            </p>
          </div>
        </div>
      </Link>
      <ShareModal
        modalOpen={openShareModal}
        setModalOpen={setOpenShareModal}
        assetId={asset._id}
      />
    </>
  );
};

export default AssetCard;
