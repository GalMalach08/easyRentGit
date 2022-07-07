import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { errorHelper, signupValidationSchema } from "../../utils/formik";
import {
  passwordColor,
  createPasswordLabel,
  changePasswordColor,
} from "../../utils/password";
import { toastify } from "../../utils/tools";
import { useDispatch, useSelector } from "react-redux";
// Translator
import { useTranslation } from "react-i18next";
// import { setIsAuth } from "../../store/actions";
import { registerUser } from "../../store/actions/user.thunk";

import RegisterModal from "./registrationModal/RegistrationModal";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Collapse,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Loader, phoneRegex } from "../../utils/tools";

// formik
import { Formik } from "formik";
import zxcvbn from "zxcvbn";
import * as Yup from "yup";

// css
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  image: {
    position: "relative",
    backgroundRepeat: "no-repeat",
    alignSelf: "center",
    backgroundPosition: "0 0",
    backgroundSize: "454px 618px",
    flexBasis: "454px",
    height: "618px",
  },
  formGrid: {
    margin: "70px auto",
  },
  paper: {
    margin: theme.spacing(3, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  label: {
    margin: "15px 10px",
    display: "block",
    textAlign: "left",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  radioGroup: {
    flexWrap: "nowrap",
    flexDirection: "row",
    margin: "10px",
  },
}));

const SignUp = () => {
  const dir = useSelector((state) => state.users.language.dir);

  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [preferredLang, setPreferredLang] = useState(
    dir === "rtl" ? "he" : "en"
  );

  const mes = useMemo(() => {
    return setPreferredLang(dir === "rtl" ? "he" : "en");
  }, [dir]);

  const [registerModalOpen, setRegisterModalOpen] = useState(true);
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const classes = useStyles();

  // Form validation
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(`${t("firstnameError.1")}`),
    lastname: Yup.string().required(`${t("lastnameError.1")}`),
    email: Yup.string()
      .required(`${t("ownerEmailTypeError.1")}`)
      .email("כתובת האימייל אינה תקינה"),
    password: Yup.string()
      .required(`${t("passwordError.1")}`)
      .min(6, `${t("passwordMinError.1")}`),
    confirmPassword: Yup.string()
      .required(`${t("confirmpasswordError.1")}`)
      .oneOf([Yup.ref("password"), null], `${t("confirmpasswordError1.1")}`),
    phoneNumber: Yup.string()
      .required(`${t("ownerNPhoneError.1")}`)
      .min(6, `${t("notValidPhone.1")}`)
      .matches(phoneRegex, `${t("notValidPhone.1")}`),
  });

  // Handle password visiblity
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handle confirm password visiblity
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Sign up new user
  const signUpUser = async (values) => {
    try {
      setButtonDisabled(true);
      dispatch(registerUser({ ...values, preferredLang }))
        .unwrap()
        .then(({ data, message }) => {
          if (data) {
            navigate("/");
            toastify(
              "SUCCESS",
              dir === "rtl"
                ? "ברוכה הבאה! אנא בדוק את המייל שלך על מנת לאמת את המשתמש"
                : "Welcome ! check your email to verify your account"
            );
          } else {
            if (message === "כתובת האיימיל הינה בשימוש") {
              toastify("ERROR", `${t("signUpMessageError.1")}`);
            } else {
              toastify("ERROR", message);
            }
          }
          setButtonDisabled(false);
        })
        .catch((err) => setButtonDisabled(false));
    } catch (error) {
      console.error(error);
    }
  };

  const checkPasswordStrength = (password) => {
    const testResult = zxcvbn(password);
    const score = (testResult.score * 100) / 4;
    setScore(score);
  };

  return (
    <Grid container className={classes.root} dir={dir}>
      {/* Sign up form */}
      <Grid
        item
        xs={12}
        lg={8}
        component={Paper}
        elevation={6}
        square
        className={classes.formGrid}
      >
        <div className={classes.paper}>
          <img
            src="https://static.crozdesk.com/web_app_library/providers/logos/000/005/518/original/easyrent-1559230516-logo.png?1559230516"
            width="100"
            height="100"
            crop="scale"
            alt="cart"
          />
          <h4 className="signup_header">{t("signUpTitle.1")}</h4>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstname: "",
              lastname: "",
              phoneNumber: "",
            }}
            onSubmit={(values) => signUpUser(values)}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(props) => (
              <>
                <form
                  style={{ textAlign: "center" }}
                  onSubmit={props.handleSubmit}
                  autoComplete="off"
                >
                  <>
                    <TextField
                      className={classes.textField}
                      name="email"
                      margin="normal"
                      label={`*${t("email.1")}`}
                      variant="outlined"
                      fullWidth
                      {...props.getFieldProps("email")}
                      {...errorHelper(props, "email")}
                      autoComplete="off"
                      renderinput={(params) => {
                        const inputProps = params.inputProps;
                        inputProps.autoComplete = "off";
                      }}
                    />

                    <TextField
                      className={classes.textField}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={`*${t("password.1")}`}
                      onKeyUp={(e) => checkPasswordStrength(e.target.value)}
                      {...props.getFieldProps("password")}
                      {...errorHelper(props, "password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {" "}
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}{" "}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={changePasswordColor(score)}
                      ></div>
                    </div>
                    <p
                      style={{
                        color: passwordColor(score),
                        textAlign: "left",
                        margin: "2px",
                      }}
                    >
                      {createPasswordLabel(score, dir)}
                    </p>

                    <TextField
                      className={classes.textField}
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label={`*${t("confirmPassword.1")}`}
                      {...props.getFieldProps("confirmPassword")}
                      {...errorHelper(props, "confirmPassword")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickConfirmPassword}>
                              {" "}
                              {showConfirmPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}{" "}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>

                  <TextField
                    className={classes.textField}
                    name="firstname"
                    margin="normal"
                    label={`*${t("firstname.1")}`}
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("firstname")}
                    {...errorHelper(props, "firstname")}
                  />
                  <TextField
                    className={classes.textField}
                    name="lastname"
                    margin="normal"
                    label={`*${t("lastname.1")}`}
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("lastname")}
                    {...errorHelper(props, "lastname")}
                  />

                  <TextField
                    className={classes.textField}
                    name="phoneNumber"
                    margin="normal"
                    label={`*${t("phoneNumber.1")}`}
                    variant="outlined"
                    fullWidth
                    {...props.getFieldProps("phoneNumber")}
                    {...errorHelper(props, "phoneNumber")}
                  />

                  <label className={classes.label}>
                    *{t("preferredLang.1")}:
                  </label>
                  <RadioGroup
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="he"
                      control={<Radio />}
                      label="עברית"
                    />
                    <FormControlLabel
                      value="en"
                      control={<Radio />}
                      label="English"
                    />
                  </RadioGroup>

                  <Button
                    disabled={
                      props.values.firstname &&
                      props.values.lastname &&
                      props.values.email &&
                      props.values.password &&
                      !props.errors.password &&
                      props.values.confirmPassword &&
                      props.values.phoneNumber &&
                      !props.errors.phoneNumber &&
                      !buttonDisabled
                        ? false
                        : true
                    }
                    className="my-3"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => signUpUser(props.values)}
                  >
                    {dir === "rtl" ? "הרשם" : "Sign up"}
                  </Button>

                  {/* Alert error */}
                  <Collapse in={openAlert}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          color="inherit"
                          size="small"
                          onClick={() => setOpenAlert(false)}
                        >
                          {" "}
                          <CloseIcon fontSize="inherit" />{" "}
                        </IconButton>
                      }
                    >
                      {message}
                    </Alert>
                  </Collapse>

                  <Grid container>
                    <Grid item>
                      <Link to="/signin" variant="body2">
                        {" "}
                        {dir === "rtl"
                          ? "יש לך משתמש ? עבור לדף ההתחברות"
                          : "Already have user ? sign in"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignUp;
