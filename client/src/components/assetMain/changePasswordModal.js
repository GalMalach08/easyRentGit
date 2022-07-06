import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  resetUserPassword,
  skipResetUserPassword,
} from "../../store/actions/user.thunk";
// Utils
import {
  passwordColor,
  createPasswordLabel,
  changePasswordColor,
} from "../../utils/password";
import { errorHelper, resetPasswordSchema } from "../../utils/formik";
// Bootstrap
import Modal from "react-bootstrap/Modal";
// Material ui
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// Formik
import { Formik } from "formik";
import zxcvbn from "zxcvbn";
import * as Yup from "yup";

// Translator
import { useTranslation } from "react-i18next";
// Styles
const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "15px 10px",
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const ChangePasswordModal = ({
  changePasswordModal,
  setChangedPasswordModal,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [score, setScore] = useState(0);
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Form validation
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(`${t("passwordError.1")}`)
      .min(6, `${t("passwordMinError.1")}`),
    confirmPassword: Yup.string()
      .required(`${t("confirmpasswordError.1")}`)
      .oneOf([Yup.ref("password"), null], `${t("confirmpasswordError1.1")}`),
  });

  // Handle password visiblity
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Password strengh function
  const checkPasswordStrength = (password) => {
    const testResult = zxcvbn(password);
    const score = (testResult.score * 100) / 4;
    setScore(score);
  };

  // Change the password
  const changePassword = async (values) => {
    dispatch(resetUserPassword({ ...values, id: user._id }))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          setChangedPasswordModal(false);
          setSuccessModal(true);
        }
      });
  };

  // Skip the change
  const skip = async () => {
    try {
      dispatch(skipResetUserPassword(user._id))
        .unwrap()
        .then(({ success }) => {
          if (success) {
            setChangedPasswordModal(false);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        centered
        show={changePasswordModal}
        onHide={() => setChangedPasswordModal(false)}
        dir={dir}
      >
        <Modal.Header>
          {" "}
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            <h4>
              {dir === "rtl" ? "עדכן את הסיסמה שלך" : "Update your password"}
            </h4>
            <h6>
              {dir === "rtl"
                ? "שמנו לב שבצעת איפוס סיסמה, אנו ממליצים לך לשנות את הסיסמה לאחת שתזכור"
                : "We noticed that you have reset your password, we recommend that you change your password to one Remember"}{" "}
            </h6>
          </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => changePassword(values)}
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
                  <TextField
                    className={classes.textField}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label={`${t("password.1")}`}
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
                    label={`${t("confirmPassword.1")}`}
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
                  <button
                    disabled={
                      props.values.password &&
                      !props.errors.password &&
                      props.values.confirmPassword &&
                      !props.errors.confirmPassword
                        ? false
                        : true
                    }
                    type="button"
                    className="btn btn-primary m-3 btn-sm"
                    onClick={() => changePassword(props.values)}
                  >
                    {dir === "rtl" ? "אפס סיסמה" : "Reset password"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm px-4"
                    onClick={() => skip()}
                  >
                    {dir === "rtl" ? "דלג" : "Skip"}
                  </button>
                </form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        centered
        show={successModal}
        onHide={() => setSuccessModal(false)}
      >
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            <h4>
              {dir === "rtl"
                ? "הסיסמה שונתה בהצלחה!"
                : "The password has changed successfully"}
            </h4>
            <button
              type="button"
              className="btn btn-primary btn-sm px-4"
              onClick={() => setSuccessModal(false)}
            >
              {dir === "rtl" ? "סיים" : "Done"}
            </button>
          </Modal.Title>{" "}
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
