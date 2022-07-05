import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "./HomeCard";
import { getNumberOfAssets } from "../../store/actions/assets.thunk";
import ChangePasswordModal from "../assetMain/changePasswordModal";

import "./style.css";

const Home = () => {
  const dispatch = useDispatch();
  const [rentCount, setRentCount] = useState(0);
  const [subletCount, setSubletCount] = useState(0);
  const [changedPasswordModal, setChangedPasswordModal] = useState(false);
  const user = useSelector((state) => state.users.data);

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
      title: "דירות למטרת סאבלט",
      body: `חולמים להעביר את הקיץ בחופים של תל אביב?
        אולי בדירה מהממת בצפון?
          אצלנו תמצאו מאגר של מעל ${subletCount} דירות המיועדות לסאבלט, אז למה אתם מחכים ?`,
      image:
        "https://thumbs.dreamstime.com/b/condominium-apartment-building-isolated-white-background-d-illustration-condominium-apartment-building-isolated-white-141265126.jpg",
    },
    {
      id: 2,
      title: "דירות להשכרה",
      body: `בעל הדירה העלה לכם את החוזה? מחפשים לעבור לדירה חדשה? מעל ${rentCount} דירות להשכרה בלחיצת כפתור `,
      image:
        "https://media.istockphoto.com/photos/modern-business-office-building-isolated-on-white-background-picture-id467820575?k=20&m=467820575&s=612x612&w=0&h=46vxEGz0ycVI8QJneiZ5Anl7EYHzN_hmJIBqcSH1wXQ=",
    },
  ];
  return (
    <>
      {/* Header */}
      <header className="styled_header">
        <div className="styled_container">
          <div className="styled_nav">
            <div className="styled_flex">
              <div>
                <h1> ברוכים הבאים לאתר השכרת הדירות הגדול בארץ </h1>
                <h5>
                  שלום לכם, ברוכים הבאים לEasyRent - הדרך למצוא את הדירה הבאה
                  שלכם.
                </h5>
                <h5>
                  באתר תוכלו למצוא מאות דירות להשכרה ולמטרת סאבלט אשר מתעדכנות
                  מידי יום.
                </h5>

                <h5 style={{ lineHeight: "1.5" }}>
                  אנו מזמינים אותכם להשתמש בחיפוש המסוננן שלנו על מנת לראות רק
                  את הדירות הרלוונטיות אליכם ולהרשם לאתר על מנת להשאר מעודכנים
                  ולהיות הראשונים שמקבלים את העדכונים לגבי הדירות הכי חמות
                </h5>
                <h5>
                  {" "}
                  בעל/ת דירה ? הרשם והעלה את הדירה שלך לאתר וכך תוכל להשכיר את
                  דירתך בקלות וביעילות
                </h5>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  תהנו😎
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
    </>
  );
};

export default Home;
