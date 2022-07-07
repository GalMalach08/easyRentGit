import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssetsOfUser,
  getNotApprovedAssetsOfUser,
} from "../../store/actions/assets.thunk";
import Url from "../Url";
import AssetCard from "../assetCard";
import { Grid, Grow } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { Loader } from "../../utils/tools";
import "./style.css";
// material ui style
import Box from "@mui/material/Box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { red, grey } from "@mui/material/colors";

const MyAssets = (props) => {
  const user = useSelector((state) => state.users.data);
  const assets = useSelector((state) => state.assets.data);
  const loading = useSelector((state) => state.assets.loading);
  const dir = useSelector((state) => state.users.language.dir);

  const [notApprovedAssets, setNotApprovedAssets] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const getAssets = async () => {
    const { id } = params;
    dispatch(getNotApprovedAssetsOfUser(id))
      .unwrap()
      .then((data) => setNotApprovedAssets(data.notApprovedAssets));
    dispatch(getAssetsOfUser(id));
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <div className="container" dir={dir}>
      <div className="header myasset_header">
        <h1>{dir === "rtl" ? "הנכסים שלי." : "My assets."}</h1>
      </div>
      <Box
        sx={{
          width: 400,
          height: 50,
          border: "1px solid grey",
          display: "flex",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <h5 style={{ marginTop: "5px" }}>מקרא:</h5>

        <div className="legend_box">
          <FiberManualRecordIcon fontSize="small" sx={{ color: red[500] }} />
          <span className="legend_span">נכסים לא מאושרים</span>
        </div>
        <div className="legend_box">
          <FiberManualRecordIcon fontSize="small" sx={{ color: grey[500] }} />
          <span className="legend_span">נכסים מאושרים</span>
        </div>
      </Box>
      <Grid container>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            {notApprovedAssets.length !== 0 && (
              <div className="container m-auto mt-5">
                {dir === "rtl" ? (
                  <Alert variant="success">
                    <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                    <p>
                      ברשותך
                      {notApprovedAssets.length === 1
                        ? " נכס אחד שממתין "
                        : ` ${notApprovedAssets.length} נכסים שממתינים `}
                      לאישור. כאשר הנכס יאושר תקבל על כך הודעה למייל שאיתו רשמת
                      את הנכס לאתר.
                    </p>
                    <hr />
                  </Alert>
                ) : (
                  <Alert variant="success">
                    <Alert.Heading>Hello {user.firstname}</Alert.Heading>
                    <p>
                      You have
                      {notApprovedAssets.length === 1
                        ? " one property "
                        : ` ${notApprovedAssets.length} properties `}
                      waiting to be approved. When the property will be
                      approved, you will receive a notification by e-mail
                    </p>
                    <hr />
                  </Alert>
                )}
              </div>
            )}
            {assets.length !== 0
              ? assets.map((asset, i) => (
                  <Grow in={true} timeout={700} key={i}>
                    <Grid item xs={11} lg={6}>
                      <AssetCard asset={asset} />
                    </Grid>
                  </Grow>
                ))
              : notApprovedAssets.length === 0 && (
                  <div className="container m-auto mt-5">
                    {dir === "rtl" ? (
                      <Alert variant="success">
                        <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                        <p>אין ברשותך נכסים שהועלו לאתר</p>

                        <hr />
                        <p className="mb-0">
                          על מנת להעלות נכס חדש לאתר
                          <span
                            className="click_here"
                            onClick={() => navigate("/upload")}
                          >
                            לחץ כאן
                          </span>
                        </p>
                      </Alert>
                    ) : (
                      <Alert variant="success">
                        <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                        <p>You do not have any assets uploaded to the site</p>

                        <hr />
                        <p className="mb-0">
                          In order to upload new property to the website
                          <span
                            className="click_here"
                            onClick={() => navigate("/upload")}
                          >
                            click here
                          </span>
                        </p>
                      </Alert>
                    )}
                  </div>
                )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default MyAssets;
