import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationMail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

const NotVerified = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  const sendEmail = () => {
    setButtonDisabled(true);
    dispatch(sendVerificationMail(user.data._id))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          toastify("SUCCESS", `${t("verifyEmail.1")}`);
          setButtonDisabled(false);
        }
      });
  };
  return (
    <div>
      {" "}
      {user && !user.data.isVerified && user.auth ? (
        <>
          <div className="not_verified">
            <Button
              className="m-2"
              size="sm"
              disabled={buttonDisabled}
              variant="outline-light"
              onClick={() => sendEmail()}
            >
              {dir === "rtl"
                ? "המשתמש לא מאומת לשליחת מייל חדש לחץ כאן"
                : "The account is not verified click here to send new email"}
            </Button>{" "}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NotVerified;
