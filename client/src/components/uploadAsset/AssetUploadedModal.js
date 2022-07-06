import React from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Material ui
import { Button } from "@material-ui/core";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Css
import "./style.css";

const AssetUploadedModal = ({ modalOpen, setModalOpen, isUpdate }) => {
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const navigate = useNavigate();

  return (
    <>
      <Modal
        dir={dir}
        size="md"
        centered
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ margin: "70px auto 30px", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "700" }}>
            <p>
              {dir !== "rtl" ? "Thanks" : "תודה"} {user.firstname}!
            </p>
            {isUpdate ? (
              dir === "rtl" ? (
                <h5>
                  עדכון נכסים עוזר לנו להשאר רלוונטים ומגדיל את הסיכויים שהנכס
                  שלך יושכר בסוף!
                </h5>
              ) : (
                <h5>
                  Updating properties helps us stay relevant or increases the
                  chances that your property will be rented in the end!
                </h5>
              )
            ) : dir === "rtl" ? (
              <h5>
                הנכס שלך הועבר לבדיקה, במידה והנכס יעבור את הבדיקות הוא יעלה
                לאתר והודעה תשלח לכתובת המייל שהזנת
              </h5>
            ) : (
              <h5>
                Your property has been Passed for testing, in case the property
                passes all the checks it will go up To the website and a message
                will be sent to the email address you entered
              </h5>
            )}
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
            {dir === "rtl" ? "מעבר לדף הבית" : "Move to home page"}
          </Button>
          <Button
            className="m-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(`/myassets/${user._id}`)}
          >
            {" "}
            {dir === "rtl" ? "מעבר לדף הנכסים האישי" : "Move to My asset page"}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssetUploadedModal;
