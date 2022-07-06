import React from "react";
import { useSelector } from "react-redux";
// Material ui
import { Button } from "react-bootstrap";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Translator
import { useTranslation } from "react-i18next";
// Target of the component - open a modal that assure that the user intrested to continue with the action (delete,updateor add) asset
const AreYouSureModal = ({
  modalOpen,
  setModalOpen,
  message,
  functionToExcute,
  modalType,
}) => {
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  return (
    <>
      <Modal
        dir={dir}
        size="md"
        centered
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ margin: "auto", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title
            style={{
              fontWeight: "700",
              margin: "auto",
            }}
          >
            {dir === "rtl" ? (
              <p>שלום {user.firstname} !</p>
            ) : (
              <p>Hello {user.firstname} !</p>
            )}

            <h5>{message}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            className="my-3"
            variant={
              modalType === "approve" ||
              modalType === "upload" ||
              modalType === "update"
                ? "outline-success"
                : "outline-danger"
            }
            size="lg"
            onClick={() => {
              setModalOpen(false);
              functionToExcute();
            }}
          >
            {modalType === "approve"
              ? `${t("approve.1")}`
              : modalType === "upload"
              ? `${t("upload.1")}`
              : modalType === "update"
              ? `${t("update.1")}`
              : `${t("delete.1")}`}
          </Button>
          <Button
            className="m-3"
            variant="outline-primary"
            size="lg"
            onClick={() => setModalOpen(false)}
          >
            {t("back.1")}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
