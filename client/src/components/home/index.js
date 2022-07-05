import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "./HomeCard";
import { getNumberOfAssets } from "../../store/actions/assets.thunk";
import ChangePasswordModal from "../assetMain/changePasswordModal";
// Translator
import { useTranslation } from "react-i18next";
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  const [rentCount, setRentCount] = useState(0);
  const [subletCount, setSubletCount] = useState(0);
  const [changedPasswordModal, setChangedPasswordModal] = useState(false);
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const { t, i18n } = useTranslation();

  const getAssetsCount = () => {
    dispatch(getNumberOfAssets())
      .unwrap()
      .then(({ rentCount, subletCount }) => {
        setRentCount(rentCount);
        setSubletCount(subletCount);
      });
  };

  useEffect(() => {
    if (user.isJustChangedPassword) {
      setChangedPasswordModal(true);
    }
    getAssetsCount();
  }, []);

  const content = [
    {
      id: 1,
      title: dir === "rtl" ? "דירות למטרת סאבלט" : "Apartment for Sublet",
      body:
        dir === "rtl"
          ? `חולמים להעביר את הקיץ בחופים של תל אביב?
        אולי בדירה מהממת בצפון?
          אצלנו תמצאו מאגר של מעל ${subletCount} דירות המיועדות לסאבלט, אז למה אתם מחכים ?`
          : `Dreaming of spending the summer on the beaches of Tel Aviv?
          Maybe in a stunning apartment up north?
            With us you will find a database of over ${subletCount} apartments for sublet, so what are you waiting for? `,
      image:
        "https://thumbs.dreamstime.com/b/condominium-apartment-building-isolated-white-background-d-illustration-condominium-apartment-building-isolated-white-141265126.jpg",
    },
    {
      id: 2,
      title: dir === "rtl" ? "דירות להשכרה" : "Apartment for Rent",
      body:
        dir === "rtl"
          ? `בעל הדירה העלה לכם את החוזה? מחפשים לעבור לדירה חדשה? מעל ${rentCount} דירות להשכרה בלחיצת כפתור `
          : `Did the landlord bring you the contract? Looking to move to a new apartment? Above ${rentCount} apartments for rent at the click of a button`,
      image:
        "https://media.istockphoto.com/photos/modern-business-office-building-isolated-on-white-background-picture-id467820575?k=20&m=467820575&s=612x612&w=0&h=46vxEGz0ycVI8QJneiZ5Anl7EYHzN_hmJIBqcSH1wXQ=",
    },
  ];
  return (
    <div dir={dir}>
      {/* Header */}
      <header className="styled_header">
        <div className="styled_container">
          <div className="styled_nav">
            <div className="styled_flex">
              <div>
                <h1> {t("welcome.1")}</h1>

                <h5>{t("homePageDesc1.1")}</h5>

                <h5 style={{ lineHeight: "1.5" }}>{t("homePageDesc2.1")}</h5>
                <h5> {t("homePageDesc3.1")}</h5>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  {t("havefun.1")}😎
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="styled_container">
        <div className="styled_flex">
          {content.map((item, i) => (
            <HomeCard item={item} />
          ))}
        </div>
      </div>
      {/* Modals */}
      <ChangePasswordModal
        changePasswordModal={changedPasswordModal}
        setChangedPasswordModal={setChangedPasswordModal}
      />
    </div>
  );
};

export default Home;
