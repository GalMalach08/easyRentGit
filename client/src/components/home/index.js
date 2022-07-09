import React, { useState, useEffect } from "react";
// React redux
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfAssets } from "../../store/actions/assets.thunk";
import { setUserPrefrences } from "../../store/actions/user.thunk";
// Components
import HomeCard from "./HomeCard";
import ChatBot from "../Chat";
import ChangePasswordModal from "../assetMain/changePasswordModal";
// Utils
import { Loader } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
// Stylr
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  const [rentCount, setRentCount] = useState(0);
  const [subletCount, setSubletCount] = useState(0);
  const [changedPasswordModal, setChangedPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);
  const isVerified = useSelector((state) => state.users.data.isVerified);

  const { t } = useTranslation();

  const getAssetsCount = () => {
    setLoading(true);
    dispatch(getNumberOfAssets())
      .unwrap()
      .then(({ rentCount, subletCount }) => {
        setRentCount(rentCount);
        setSubletCount(subletCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleChatbot = ({ values }) => {
    if (values[0] !== "not") {
      const [, numberOfRooms, price, area] = values;
      dispatch(
        setUserPrefrences({
          userId: user._id,
          roomsNumber: numberOfRooms,
          price,
          area,
        })
      );
    }
  };

  useEffect(() => {
    if (user.isJustChangedPassword) {
      setChangedPasswordModal(true);
    }
    getAssetsCount();
    window.scrollTo(0, 0);
  }, []);

  const content = [
    {
      id: 1,
      title: dir === "rtl" ? "דירות למטרת סאבלט" : "Apartments for Sublet",
      body:
        dir === "rtl"
          ? `חולמים להעביר את הקיץ בחופים של תל אביב?
        אולי בדירה מהממת בצפון?
          אצלנו תמצאו מאגר של מעל ${subletCount} דירות המיועדות לסאבלט, אז למה אתם מחכים ?`
          : `Dreaming of spending the summer on the beaches of Tel Aviv?
          Maybe in a stunning apartment in the north of the city?
            With us you will find over ${subletCount} apartments for sublet, so what are you WATING FOR? `,
      image:
        "https://thumbs.dreamstime.com/b/condominium-apartment-building-isolated-white-background-d-illustration-condominium-apartment-building-isolated-white-141265126.jpg",
    },
    {
      id: 2,
      title: dir === "rtl" ? "דירות להשכרה" : "Apartments for Rent",
      body:
        dir === "rtl"
          ? `בעל הדירה העלה לכם את החוזה? מחפשים לעבור לדירה חדשה? מעל ${rentCount} דירות להשכרה בלחיצת כפתור `
          : `Has the owner raised your rent? Looking to move to a new apartment? Above ${rentCount} apartments for rent on ONE CLICK`,
      image:
        "https://media.istockphoto.com/photos/modern-business-office-building-isolated-on-white-background-picture-id467820575?k=20&m=467820575&s=612x612&w=0&h=46vxEGz0ycVI8QJneiZ5Anl7EYHzN_hmJIBqcSH1wXQ=",
    },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div dir={dir}>
          {/* Header */}
          <header className="styled_header">
            <div className="styled_container">
              <div className="styled_nav">
                <div className="styled_flex">
                  <div>
                    <h1> {t("welcome.1")}</h1>

                    <h5>{t("homePageDesc1.1")}</h5>

                    <h5 style={{ lineHeight: "1.5" }}>
                      {t("homePageDesc2.1")}
                    </h5>
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

          <div className="chatbot">
            <ChatBot handleChatbot={handleChatbot} />
          </div>

          {/* Modals */}
          <ChangePasswordModal
            changePasswordModal={changedPasswordModal}
            setChangedPasswordModal={setChangedPasswordModal}
          />
        </div>
      )}
    </>
  );
};

export default Home;
