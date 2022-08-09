import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

// Check if the user is authenticated and behave accordingly
const AuthGaurd = (props) => {
  const auth = useSelector((state) => state.users.auth);
  const location = useLocation();
  if (!auth) return <Navigate to="/signin" replace state={location} />;
  return props.children;
};

export default AuthGaurd;
