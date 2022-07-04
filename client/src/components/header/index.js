import React from "react";
// React router dom
import { NavLink } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
import PopUp from "./popup/PopUp";
// Bootstrap
import { Nav, Navbar } from "react-bootstrap";

// Css
import "./style.css";

const TopNavBar = () => {
  const auth = useSelector((state) => state.users.auth);
  const isAdmin = useSelector((state) => state.users.data.isAdmin);
  const user = useSelector((state) => state.users.data);

  return (
    <>
      {/* Top navbar */}

      <div className="header_section">
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
                    סאבלט
                  </NavLink>
                  <NavLink
                    to="/15"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    השכרה
                  </NavLink>
                  <NavLink
                    to="/upload"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    העלאת נכס
                  </NavLink>
                  {auth && (
                    <NavLink
                      to={`/myassets/${user._id}`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      הנכסים שלי
                    </NavLink>
                  )}
                  {isAdmin && (
                    <NavLink
                      to={`/assets/notapproved`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      נכסים שלא אושרו
                    </NavLink>
                  )}
                  <NavLink
                    to={`/qanda`}
                    className="nav_link"
                    activeclassname="selected"
                  >
                    שאלות ותשובות
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : null}
        </Navbar>
      </div>
    </>
  );
};

export default TopNavBar;
