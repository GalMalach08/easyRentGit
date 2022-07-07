import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendVerificationMail } from "../../store/actions/user.thunk";
import { toastify } from "../../utils/tools";
import { Alert, Button } from "react-bootstrap";
// Translator
import { useTranslation } from "react-i18next";
// Material ui
import { Grid, Paper } from "@material-ui/core";
const AlertBox = () => {
  const user = useSelector((state) => state.users.data);
  const [buttonDisables, setButtonDisables] = useState(false);
  const dir = useSelector((state) => state.users.language.dir);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sendEmail = () => {
    setButtonDisables(true);
    dispatch(sendVerificationMail(user._id))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          toastify("SUCCESS", `${t("verifyEmail.1")}`);
          setButtonDisables(false);
        }
      });
  };
  return (
    <>
      <Grid dir={dir} item xs={10} md={12}>
        {dir === "rtl" ? (
          <Alert
            variant="success"
            style={{ margin: "20px auto", maxWidth: "70%" }}
          >
            <Alert.Heading>היי {user.firstname}</Alert.Heading>
            <p>בדף זה ניתן להעלות נכסים למערכת</p>
            <p>
              {" "}
              על מנת להעלות נכס חדש עליך לאמת המשתמש שלך דרך המייל שנשלח אליך
              לכתובת איתה נרשמת
            </p>

            <hr />
            <p className="mb-0">
              <Button
                disabled={buttonDisables}
                variant="outline-success"
                onClick={() => sendEmail()}
              >
                לשליחת מייל חדש לחץ כאן
              </Button>{" "}
            </p>
          </Alert>
        ) : (
          <Alert
            variant="success"
            style={{ margin: "20px auto", maxWidth: "70%" }}
          >
            <Alert.Heading>Hello {user.firstname}</Alert.Heading>
            <p>On this page you can upload assets to the system </p>
            <p>
              In order to upload a new property you must authenticate your user
              via the email sent to you to the address with which you registered
            </p>
            <hr />
            <p className="mb-0">
              <Button
                disabled={buttonDisables}
                variant="outline-success"
                onClick={() => sendEmail()}
              >
                Click here to send new email
              </Button>{" "}
            </p>
          </Alert>
        )}
      </Grid>
    </>
  );
};

export default AlertBox;
