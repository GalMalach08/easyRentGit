import React from "react";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Redux
import { useSelector } from "react-redux";
// React-share
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
// Css
import "./style.css";

// Share modal - allowed to share asset by whatsapp facebook and twitter
const ShareModal = ({ modalOpen, setModalOpen }) => {
  const dir = useSelector((state) => state.users.language.dir);

  return (
    <>
      <Modal
        size="md"
        centered
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        style={{ margin: "70px auto 30px", textAlign: "center" }}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: "auto" }}>
            {dir === "rtl" ? <p>שתף את הנכס</p> : <p>Share the asset</p>}
            <div className="share_icons_div">
              <FacebookShareButton
                url={`https://lesublet.com/asset/610a5488b69afec97ce74ae2?p=0`}
                quote="fuck it"
                className="share_icon"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton
                url={`https://lesublet.com/asset/610a5488b69afec97ce74ae2?p=0`}
                appId="521270401588372"
                className="share_icon"
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
              <WhatsappShareButton
                url={`https://lesublet.com/asset/610a5488b69afec97ce74ae2?p=0`}
                title="אח שלי קבל את זאת"
                separator=" "
                className="share_icon"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};

export default ShareModal;
