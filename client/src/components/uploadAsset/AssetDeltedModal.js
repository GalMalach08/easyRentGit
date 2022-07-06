import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
// Material ui
import { Button } from "@material-ui/core";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Css
import "./style.css";

const AssetDeletedModal = ({ DeletedmodalOpen, message }) => {
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const navigate = useNavigate();

  return (
    <>
      <Modal
        size="md"
        centered
        show={DeletedmodalOpen}
        onHide={() => navigate("/")}
        style={{ margin: "auto", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: "700",
              margin: "auto",
            }}
          >
            <p>
              {dir === "rtl" ? "תודה" : "Thanks"} {user.firstname}!
            </p>

            <h5>{message}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            className="my-3"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}
          >
            {dir === "rtl" ? "מעבר לדף הבית" : "Move to Home Page"}
          </Button>
          <Button
            className="m-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(`/myassets/${user._id}`)}
          >
            {" "}
            {dir === "rtl" ? "מעבר לדף הנכסים האישי" : "Move to My asset Page"}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssetDeletedModal;
