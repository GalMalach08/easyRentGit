import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader } from "../../utils/tools";
import { verifyUserEmail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";

const Varification = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const token = search.get("t");
  const { t } = useTranslation();
  useEffect(() => {
    if (token) {
      dispatch(verifyUserEmail(token))
        .unwrap()
        .then(({ verified, message }) => {
          if (verified) {
            navigate("/");

            if (message) {
              toastify("SUCCESS", `${t("userAlreadyVerfied.1")}`);
            } else {
              toastify("SUCCESS", `${t("emailHasVerified.1")}`);
            }
          }
        });
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Varification;
