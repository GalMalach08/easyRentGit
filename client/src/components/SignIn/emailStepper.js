import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfUserExcistByEmail,
  sendResetPasswordMail,
} from "../../store/actions/user.thunk";
// Formik
import { useFormik } from "formik";
import { errorHelper } from "../../utils/formik";
import * as Yup from "yup";
// Translator
import { useTranslation } from "react-i18next";
// Material ui
import { TextField, Button, Stepper, Step, StepLabel } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// Style
import "./style.css";
import { emailStepperStyle } from "../../styles";

const useStyles = emailStepperStyle;

const EmailStepper = ({ setEmailModal }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  const steps = ["הכנס את המייל שלך", "אימות משתמש", "האם אתה בטוח ?", "בוצע"];
  const englishSteps = [
    "Inset your email",
    "User Identify",
    "Are you sure ?",
    "Done",
  ];

  // Handle steps functions
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Buttons functions
  const nextBtn = () => {
    return (
      <Button
        className="m-3"
        variant="contained"
        color="primary"
        disabled={buttonDisabled}
        onClick={() => {
          if (activeStep === 0) {
            bringUser();
          }
        }}
      >
        {dir === "rtl" ? "המשך" : "Next"}
      </Button>
    );
  };
  const prevBtn = () => (
    <Button className="m-3" variant="contained" onClick={handleBack}>
      {dir === "rtl" ? "חזור" : "Back"}
    </Button>
  );

  // Check if the user excist by email
  const bringUser = async () => {
    setButtonDisabled(true);
    dispatch(checkIfUserExcistByEmail(formik.values.email))
      .unwrap()
      .then(({ success, user }) => {
        if (success) {
          if (user.googleId) {
            setErrorMessage(`${t("userIsEcxistWithGoogle.1")}`);
          } else if (user.facebookId) {
            setErrorMessage(
              'משתמש זה מקושר לחשבון של פייסבוק, על מנת להתחבר לחץ על הכפתור "התחבר באמצעות פייסבוק" שבדף ההתחברות'
            );
          } else {
            setUser(user);
            handleNext();
          }
        } else {
          setErrorMessage(`${t("userNotFound.1")}`);
        }
        setButtonDisabled(false);
      });
  };

  const sendEmail = async () => {
    setButtonDisabled(true);
    dispatch(sendResetPasswordMail(formik.values.email))
      .unwrap()
      .then(({ success }) => {
        if (success) handleNext();
        setButtonDisabled(false);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(`${t("ownerEmailError.1")}`)
        .email(`${t("ownerEmailTypeError.1")}`),
    }),
    onSubmit: (values) => {
      sendEmail(values);
    },
  });

  return (
    <>
      <Stepper activeStep={activeStep}>
        {dir === "rtl"
          ? steps.map((step) => (
              <Step key={step}>
                {" "}
                <StepLabel>{step}</StepLabel>
              </Step>
            ))
          : englishSteps.map((step) => (
              <Step key={step}>
                {" "}
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
      </Stepper>

      <form
        className="mt-3 stepper_form text-center"
        onSubmit={formik.handleSumbit}
      >
        {activeStep === 0 ? (
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="email"
              label={`${t("email.1")}`}
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
            {errorMessage && !formik.errors.email && (
              <div className="error">{errorMessage}</div>
            )}
            {formik.values.email && !formik.errors.email ? nextBtn() : null}
          </div>
        ) : null}

        {activeStep === 1 && user ? (
          <div style={{ textAlign: "center" }}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.firstname} {user.lastname}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Avatar
                      style={{
                        backgroundColor: "#D9952C",
                        margin: "auto",
                      }}
                    >
                      {user.firstname[0]}
                    </Avatar>
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    {dir === "rtl" ? "האם זה אתה ?" : "Is that you ?"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{ marginLeft: "auto" }}>
                <Button
                  className="m-auto"
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                >
                  {dir === "rtl" ? "כן" : "Yes"}
                </Button>
                {prevBtn()}
              </CardActions>
            </Card>
          </div>
        ) : null}

        {activeStep === 2 ? (
          <div className="form-group">
            <Button
              className="m-3"
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
              onClick={() => {
                formik.submitForm();
              }}
            >
              {dir === "rtl" ? "שלח לי סיסמה חדשה" : "Send me new password"}
            </Button>
            {prevBtn()}
          </div>
        ) : null}

        {activeStep === 3 ? (
          <div className="form-group">
            {dir === "rtl" ? (
              <h5>אימייל נשלח לכתובת {formik.values.email}</h5>
            ) : (
              <h5>Email sent to {formik.values.email}</h5>
            )}
            <Button
              className="m-3"
              variant="contained"
              color="primary"
              onClick={() => setEmailModal(false)}
            >
              {" "}
              סגור{" "}
            </Button>
          </div>
        ) : null}
      </form>
    </>
  );
};
export default EmailStepper;
