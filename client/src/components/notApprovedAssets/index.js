import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotApprovedAssets } from "../../store/actions/assets.thunk";
import { clearAssets } from "../../store/reducers/assets_reducer";
import { Loader } from "../../utils/tools";
import {} from "react-router-dom";
import Url from "../Url";
import AssetCard from "../assetCard";
import { Grid, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "react-bootstrap";
import "./style.css";
// material ui style
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    margin: "0px 10px",
  },
}));

const NotApprovedAssets = (props) => {
  const user = useSelector((state) => state.users.data);
  const loading = useSelector((state) => state.assets.loading);
  const assets = useSelector((state) => state.assets.data);
  const dir = useSelector((state) => state.users.language.dir);
  console.log(assets);
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [assets, setAssets] = useState("");

  const getAssets = async () => {
    dispatch(getNotApprovedAssets());
  };

  useEffect(() => {
    dispatch(clearAssets());
    getAssets();
  }, []);

  return (
    <div className="container" dir={dir}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container>
          {assets.map((asset) => (
            <Grow in={true} timeout={700} key={assets.id}>
              <Grid item xs={11} lg={6} className={classes.root}>
                <AssetCard asset={asset} />
              </Grid>
            </Grow>
          ))}
          {assets.length === 0 && (
            <div className="container m-auto mt-5">
              {dir === "rtl" ? (
                <Alert variant="success">
                  <Alert.Heading>שלום {user.firstname}</Alert.Heading>
                  <p>אין נכסים לבדיקה נכון לזמן זה</p>
                  <hr />
                </Alert>
              ) : (
                <Alert variant="success">
                  <Alert.Heading>Hello {user.firstname}</Alert.Heading>
                  <p>There is no propery to check at this point.</p>
                  <hr />
                </Alert>
              )}
            </div>
          )}
        </Grid>
      )}
    </div>
  );
};

export default NotApprovedAssets;
