import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "./store/reducers/users_reducer";
import AuthGuard from "./components/hoc/authGaurd";
import { isAuth } from "./store/actions/user.thunk";
import { Loader } from "./utils/tools";
import Header from "./components/header";
import Home from "./components/home";
import AssetsMain from "./components/assetMain";
import Asset from "./components/asset";
import UploadAsset from "./components/uploadAsset";
import NotApprovedAssets from "./components/notApprovedAssets";
import QuestionsAndAnswers from "./components/questionsAndAnswers";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/signup/SignUp";
import MyAssets from "./components/myAssets";
import Verification from "./components/varification";
import NotVerified from "./components/notVerified";
import Logout from "./components/logout";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CustomTheme } from "./utils/tools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme } from "@material-ui/core/styles";

// Translator
import { useTranslation } from "react-i18next";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Router = () => {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.users);
  const language = useSelector((state) => state.users.language);

  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(isAuth());
    const lang = localStorage.getItem("i18nextLng");
    const direction = lang === "he" ? "rtl" : "ltr";
    dispatch(setLanguage({ dir: direction }));
    i18n.changeLanguage(lang);
  }, [dispatch]);

  useEffect(() => {
    if (user.auth !== null) {
      setLoading(false);
    }
  }, [user]);

  const CustomTheme = createTheme({
    direction: language ? language.dir : "rtl",
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={CustomTheme}>
          <StylesProvider jss={jss}>
            <BrowserRouter dir="rtl">
              <Header />
              <Routes>
                <Route
                  path="/upload"
                  element={
                    <AuthGuard>
                      <UploadAsset />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/update/:id"
                  element={
                    <AuthGuard>
                      <UploadAsset />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/asset/:id"
                  element={
                    <AuthGuard>
                      <Asset />
                    </AuthGuard>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/myassets/:id"
                  element={
                    <AuthGuard>
                      <MyAssets />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/assets/notApproved"
                  element={
                    <AuthGuard>
                      <NotApprovedAssets />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/qanda"
                  element={
                    <AuthGuard>
                      <QuestionsAndAnswers />{" "}
                    </AuthGuard>
                  }
                />
                <Route path="/user/verification" element={<Verification />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/:id"
                  element={
                    <AuthGuard>
                      <AssetsMain />
                    </AuthGuard>
                  }
                />{" "}
                <Route
                  path="/"
                  element={
                    <AuthGuard>
                      <Home />
                    </AuthGuard>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
            <NotVerified />
          </StylesProvider>
        </ThemeProvider>
      )}
    </>
  );
};

export default Router;
