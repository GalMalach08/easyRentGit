import React from "react";
// React router dom
import { NavLink } from "react-router-dom";
// Translator
import { useTranslation } from "react-i18next";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../store/reducers/users_reducer";
import PopUp from "./popup/PopUp";
// Components
import LanguageAvatar from "./LanguageAvatar";
// Bootstrap
import { Nav, Navbar } from "react-bootstrap";

// Css
import "./style.css";

const TopNavBar = () => {
  const auth = useSelector((state) => state.users.auth);
  const isAdmin = useSelector((state) => state.users.data.isAdmin);
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeSiteLanguage = (lang) => {
    dispatch(
      setLanguage({ type: lang, dir: `${lang === "he" ? "rtl" : "ltr"}` })
    );
    i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* Top navbar */}

      <div className="header_section" dir={dir}>
        <Navbar expand="lg" className="navbar">
          <NavLink to="/">
            <Navbar.Brand className="nav_brand">
              {" "}
              <span style={{ color: "#F1A32B" }}>Easy</span>
              <span style={{ color: "#3882A6" }}>Rent</span>
            </Navbar.Brand>
          </NavLink>
          {auth ? (
            <>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mr-auto my-2 my-lg-0"
                  navbarScroll
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <span className="nav_link popup" activeclassname="selected">
                    <PopUp />
                  </span>

                  <NavLink
                    to="/5"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    {t("Sublet.1")}
                  </NavLink>
                  <NavLink
                    to="/15"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    {t("Rent.1")}
                  </NavLink>
                  <NavLink
                    to="/upload"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    {t("Uploadasset.1")}
                  </NavLink>
                  {auth && (
                    <NavLink
                      to={`/myassets/${user._id}`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      {t("Myassets.1")}
                    </NavLink>
                  )}
                  {isAdmin && (
                    <NavLink
                      to={`/assets/notapproved`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      {t("NotAprrovedAssets.1")}
                    </NavLink>
                  )}
                  <NavLink
                    to={`/qanda`}
                    className="nav_link"
                    activeclassname="selected"
                  >
                    {t("QandA.1")}
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : null}
          <LanguageAvatar changeSiteLanguage={changeSiteLanguage} />
        </Navbar>
      </div>
    </>
  );
};

export default TopNavBar;
