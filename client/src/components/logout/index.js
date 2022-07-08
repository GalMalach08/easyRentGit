import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/reducers/users_reducer";
import { removeTokenCookie } from "../../utils/tools";
import { resetFilter } from "../../store/reducers/assets_reducer";
const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(signOut());
    dispatch(resetFilter());
    removeTokenCookie();

    navigate("/signin");
  };

  useEffect(() => {
    logOut();
  }, []);

  return null;
};

export default LogOut;
