import React, { useEffect, useState, useMemo } from "react";
// React router dom
import { useParams } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAssetById,
  approveAssetById,
  deleteNotApprovedAsset,
} from "../../store/actions/assets.thunk";
// Components
import WrappedMap from "../../utils/GoogleMap";
import NotRelvantModal from "./noRelvantModal";
import AssetCard from "../assetCard";
import AssetDeletedModal from "../uploadAsset/AssetDeltedModal";
import AreYouSureModal from "../areYouSureModal";
// Utils
import { Loader } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
// Material ui
import { Grid, Grow } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
// React bootstrap
import { Button } from "react-bootstrap";
// Packages
import { FacebookMessengerShareButton } from "react-share";
import ReactWhatsapp from "react-whatsapp";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Style
import "./style.css";
import { singleAssetPageStyle } from "../../styles";

// Material ui style
const useStyles = singleAssetPageStyle;

// Show asset on single page
const Asset = () => {
  const [asset, setAsset] = useState("");
  const [notRelevantModal, setNotRelevantModal] = useState(false);
  const [deletedmodalOpen, setDeletedmodalOpen] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [functionToExcute, setFunctionToExcute] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const dir = useSelector((state) => state.users.language.dir);
  const user = useSelector((state) => state.users.data);

  const { t } = useTranslation();
  const { id } = params;

  // Open modal that checks if the user sure about the action
  const checkIfSure = (whatType) => {
    if (whatType === "approve") {
      setModalMessage(`${t("areUsureUpload.1")}`);
      setFunctionToExcute(() => () => approveAsset());
    } else if (whatType === "delete") {
      setModalMessage(`${t("areUsureDelete.1")}`);
      setFunctionToExcute(() => () => deleteAsset());
    }
    setModalType(whatType);
    setAreYouSureModal(true);
  };

  // Get the asset from the database
  const getAsset = async () => {
    setLoading(true);
    dispatch(getAssetById(id))
      .unwrap()
      .then(({ asset }) => {
        setAsset(asset);
        setLoading(false);
      });
  };

  // Approve asset
  const approveAsset = async () => {
    setLoading(true);
    dispatch(approveAssetById(asset._id))
      .unwrap()
      .then(() => {
        setModalMessage(`${t("uploadSuccess.1")}`);
        setDeletedmodalOpen(true);
        setLoading(false);
      });
  };

  // Contact with the owner - only for admins about not approved asset
  const contact = () => {
    navigator.clipboard.writeText("asdasd");
    const win = window.open(
      "https://mail.google.com/mail/u/0/#inbox?compose=new",
      "_blank"
    );
    win.focus();
  };

  // Delete asset from the database
  const deleteAsset = async () => {
    setLoading(true);
    dispatch(deleteNotApprovedAsset(asset._id))
      .unwrap()
      .then(() => {
        setModalMessage(`${t("deletedSuccess.1")}`);
        setDeletedmodalOpen(true);
        setLoading(false);
      });
  };

  // Fire the getAsset function on page load
  useEffect(() => {
    getAsset();
  }, []);

  // Make the text for the whatsapp button
  const createMarkup = useMemo(() => {
    return {
      __html: `<img src="https://www.herzog.ac.il/wp-content/uploads/2017/11/whatsapp-icon-logo-vector.png" width:"25px" height="25px"/> 
      &nbsp;&nbsp;${
        dir === "rtl"
          ? `צור קשר עם ${asset.owner} בווצאפ`
          : `Contact ${asset.owner} via whatsapp`
      } `,
    };
  }, [dir, asset.owner]);

  return (
    <div>
      {!loading ? (
        <Grid container dir={dir}>
          {asset && (
            <Grow in={true} timeout={700} key={asset.id}>
              <Grid item xs={12}>
                <AssetCard asset={asset} assetPage={true} />
                {/* More details  */}
                <div className="more_details" dir={dir}>
                  <h4>{t("moreDetails.1")}</h4>
                  {asset.description || asset.englishDescription ? (
                    dir === "rtl" ? (
                      <p> {asset.description} </p>
                    ) : (
                      <p>{asset.englishDescription} </p>
                    )
                  ) : dir === "rtl" ? (
                    "אין תיאור זמין"
                  ) : (
                    "No description available"
                  )}
                </div>
                {/* Whatsapp */}
                <div className="contact_btn_div">
                  <div className="whatapp_div">
                    <ReactWhatsapp
                      number={`+972-${asset.phoneNumber}`}
                      message={`היי ${asset.owner}, אני מעוניין בדירה שפרסמת ברחוב ${asset.address},האם עוד רלוונטי  ?`}
                      dangerouslySetInnerHTML={createMarkup}
                      className="ip-add-cart whatsapps"
                    />
                  </div>
                  {/* Facebook */}
                  <button className="ip-add-cart facebook">
                    <FacebookMessengerShareButton
                      url={`https://easyrent2023.herokuapp.com/asset/${id}`}
                      to="10209538685461605"
                      appId="111391301676"
                    >
                      <FacebookIcon className={classes.icon} />
                      {dir === "rtl"
                        ? `צור קשר עם ${asset.owner} בפייסבוק`
                        : `Contact ${asset.owner} via facebook`}
                    </FacebookMessengerShareButton>
                  </button>
                </div>

                {/* Map */}
                <div className="map_div">
                  <WrappedMap address={asset.address} />
                </div>

                {/* Buttons */}
                {asset.notApproved && user.isAdmin && (
                  <div className="btns_div">
                    <Button
                      variant="success"
                      onClick={() => checkIfSure("approve")}
                    >
                      {dir === "rtl" ? "אשר נכס" : "Approve property"}
                    </Button>{" "}
                    <CopyToClipboard text={asset.userId.email}>
                      <Button variant="info" onClick={contact}>
                        {dir === "rtl"
                          ? " צור קשר עם בעל הנכס"
                          : "Contact the owner"}
                      </Button>
                    </CopyToClipboard>
                    <Button
                      variant="danger"
                      onClick={() => checkIfSure("delete")}
                    >
                      {dir === "rtl" ? "מחק נכס" : "Delete property"}
                    </Button>{" "}
                  </div>
                )}

                {/* Modals */}
                {!asset.notApproved && (
                  <h6
                    className="not_relevant"
                    onClick={() => setNotRelevantModal(true)}
                  >
                    {dir === "rtl"
                      ? "הנכס לא רלוונטי? עדכנו אותנו"
                      : "The property is not relevant ? let us know"}
                  </h6>
                )}
                <NotRelvantModal
                  notRelevantModal={notRelevantModal}
                  setNotRelevantModal={setNotRelevantModal}
                  assetId={asset._id}
                />
              </Grid>
            </Grow>
          )}
          <AssetDeletedModal
            message={modalMessage}
            DeletedmodalOpen={deletedmodalOpen}
          />
          <AreYouSureModal
            modalOpen={areYouSureModal}
            setModalOpen={setAreYouSureModal}
            message={modalMessage}
            functionToExcute={functionToExcute}
            modalType={modalType}
          />
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Asset;
