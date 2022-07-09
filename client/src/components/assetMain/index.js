import React, { useEffect, useState, useRef } from "react";
// React-Router-Dom
import { useParams, useNavigate } from "react-router-dom";
// React-Redux
import { useSelector, useDispatch } from "react-redux";
import { setJustEntered } from "../../store/reducers/users_reducer";
import { clearAssets, resetSkip } from "../../store/reducers/assets_reducer";
import {
  getAssetsByCategory,
  filterAssets,
} from "../../store/actions/assets.thunk";
import { setUserPrefrences } from "../../store/actions/user.thunk";
// Utils
import { Loader } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
// Components
import AssetCard from "../assetCard";
import FilterSearchModal from "../filterSearchModal";
import ChatBot from "../Chat";
import FilterBox from "../filterSearchModal/FilterBox";
// Material ui
import { Grid, Grow } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
// Bootstrap
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
// Css
import "./style.css";

const Home = () => {
  // Redux state
  const assets = useSelector((state) => state.assets.data);
  const loading = useSelector((state) => state.assets.loading);
  const filteredSearch = useSelector((state) => state.assets.filteredSearch);
  const skips = useSelector((state) => state.assets.skip);
  const assetsTotalLength = useSelector(
    (state) => state.assets.assetsTotalLength
  );
  const user = useSelector((state) => state.users.data);
  const auth = useSelector((state) => state.users.auth);
  const isVerified = useSelector((state) => state.users.data.isVerified);
  const dir = useSelector((state) => state.users.language.dir);
  // Component state
  const [modalOpen, setModalOpen] = useState(false);
  const [isSublet, setIsSublet] = useState(false);
  const [filObj, setFilterObj] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [isBot, setIsBot] = useState(false);
  const { t } = useTranslation();

  // Params
  const { id } = useParams();
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();
  // UseRef
  const firstUpdate = useRef(true);

  // Get all the assets
  const getAssets = async (skip = skips) => {
    dispatch(getAssetsByCategory({ id, skip, limit }))
      .unwrap()
      .then(({ assets }) => {
        if (!assets) navigate("/");
      });
  };

  // Get filtered assets
  const getFilteredAssets = (filterObject = filObj, skip = skips) => {
    console.log(id !== "5");
    if (filterObject.dates.length === 0 && id !== "5") {
      dispatch(
        filterAssets({
          filterObj: { ...filterObject, dates: [...filteredSearch.dates] },
          skip,
          limit,
        })
      );
    } else {
      dispatch(filterAssets({ filterObj: filterObject, skip, limit }));
    }
  };

  const handleChatbot = ({ values }) => {
    if (values[0] === "not") {
      setTimeout(() => setIsBot(false), 3000);
    } else {
      const [, numberOfRooms, price, area] = values;
      dispatch(
        setUserPrefrences({
          userId: user._id,
          roomsNumber: numberOfRooms,
          price,
          area,
        })
      );
      setTimeout(() => setIsBot(false), 3000);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!filteredSearch.dates) {
      dispatch(clearAssets());
      getAssets();
    }
  }, [filteredSearch]);

  useEffect(() => {
    id === "15" ? setIsSublet(false) : setIsSublet(true);
    dispatch(resetSkip());
    dispatch(clearAssets());
    if (!filteredSearch.dates) {
      getAssets(0);
    }
  }, [id]);

  useEffect(() => {
    if (!user.preferences && user.firstname) {
      // the user is excist and has no prefrences
      setIsBot(true);
    }
    dispatch(setJustEntered());
  }, []);

  return (
    <div dir={dir}>
      {/* Filter Box */}
      {loading ? (
        <Loader />
      ) : (
        <FilterBox
          filteredSearch={filteredSearch}
          setModalOpen={setModalOpen}
        />
      )}

      <div className="not_filtered_divs">
        {/* Chat Bot Box */}

        <div className="chatbot">
          <Grow in={true} timeout={3000}>
            <ChatBot handleChatbot={handleChatbot} />
          </Grow>
        </div>

        {/* Header */}
      </div>
      <div className="header">
        {loading ? (
          <Loader />
        ) : isSublet ? (
          <h1> {t("Sublet.1")}.</h1>
        ) : (
          <h1> {t("Rent.1")}.</h1>
        )}
      </div>

      {/* Apartments Grid */}
      <StylesProvider injectFirst>
        <div className="container">
          <Grid container>
            {loading ? <Loader /> : null}
            {assets.length !== 0
              ? assets.map((asset, i) => (
                  <Grow in={true} timeout={700} key={i}>
                    <Grid item xs={12} lg={6}>
                      <AssetCard asset={asset} />
                    </Grid>
                  </Grow>
                ))
              : !loading && (
                  <Alert variant="success" style={{ margin: "50px auto" }}>
                    {dir === "rtl" ? (
                      <>
                        <Alert.Heading>שלום {user.firstname}</Alert.Heading>

                        <p>
                          אין נכסים {isSublet ? "למטרת סאבלט" : "להשכרה"}{" "}
                          התואמים לתנאים שהזנת
                        </p>
                      </>
                    ) : (
                      <>
                        <Alert.Heading>Hello {user.firstname}</Alert.Heading>
                        <p>
                          There is no assets{" "}
                          {isSublet ? "for sublet" : "for rent"} that matches
                          your results
                        </p>
                      </>
                    )}
                    <p>{t("noassets.1")}</p>
                  </Alert>
                )}
          </Grid>

          {/* Load more button */}
          {assetsTotalLength > assets.length && !loading ? (
            <Button
              className="page_button mb-6 mr-5"
              variant="outline-info"
              onClick={() => {
                if (filteredSearch.dates) getFilteredAssets();
                else getAssets();
              }}
            >
              {t("loadmore.1")}
            </Button>
          ) : (
            !loading && (
              <h3 className="seen_all_header">
                {dir === "rtl"
                  ? "ראיתם הכל, דירות חדשות עולות כל הזמן המשיכו להתעדכן 😀"
                  : "You saw everything, new apartments are uploading all the time, keep up to date 😀"}
              </h3>
            )
          )}
        </div>

        {/* Modals */}

        <FilterSearchModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          filteredSearch={filteredSearch}
          isSublet={isSublet}
          page={page}
          setPage={setPage}
          getFilteredAssets={getFilteredAssets}
          setFilterObj={setFilterObj}
        />
      </StylesProvider>
    </div>
  );
};

export default Home;
