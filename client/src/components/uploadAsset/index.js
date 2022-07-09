import React, { useState, useEffect, useRef } from "react";
// React-router-dom
import { useLocation, useParams, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addAsset,
  updateAsset,
  deleteApprovedAsset,
  getAssetById,
} from "../../store/actions/assets.thunk";
// Component
import AssetUploadedModal from "./AssetUploadedModal";
import AssetDeletedModal from "./AssetDeltedModal";
import AreYouSureModal from "../areYouSureModal";
import AlertBox from "./AlertBox";
// Utils
import { Loader, phoneRegex, toastify } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
// Material ui components
import {
  Grid,
  TextField,
  Button,
  Paper,
  Collapse,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Tabs,
  Tab,
  TextareaAutosize,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";
// Formik
import { Formik } from "formik";
import { errorHelper } from "../../utils/formik";
// Dates
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// React image gallery
import ImageGallery from "react-image-gallery";
// moment
import moment from "moment";
// Style
import "./style.css";
import { updateAssetForm } from "../../styles";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { getLocation } from "../../utils/tools";

const useStyles = makeStyles((theme) => updateAssetForm(theme));

const UploadAsset = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedAsset, setUpdatedAsset] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [timeValue, setTimeValue] = useState(0);
  const [roomsValue, setRoomsValue] = useState("1");
  const [imageName, setImageName] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [enterDate, setEnterDate] = useState(new Date());
  const [exitDate, setExitDate] = useState(new Date());
  const [type, setType] = useState("");
  const [area, setArea] = useState("0");
  const [imagesArr, setImagesArr] = useState([]);
  const [isSublet, setIsSublet] = useState("1");
  const [DeletedmodalOpen, setDeletedmodalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [functionToExcute, setFunctionToExcute] = useState("");
  const [notApproved, setNotApproved] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const galleryRef = useRef();
  const addressRef = useRef();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();

  const menuItem = [
    { value: "הצפון הישן", label: `${t("oldNorth.1")}` },
    { value: "הצפון החדש", label: `${t("newNorth.1")}` },
    { value: "לב העיר", label: `${t("center.1")}` },
    { value: "פלורנטין", label: `${t("florentin.1")}` },
    { value: "שוק הכרמל", label: `${t("cramelMarket.1")}` },
    { value: "רוטשילד", label: `${t("rotchild.1")}` },
    { value: "כרם התימנים", label: `${t("cerem.1")}` },
    { value: "יפו", label: `${t("jaffa.1")}` },
    { value: "אחר", label: `${t("other.1")}` },
  ];
  const rooms1 = [
    { value: "1", label: `${t("oneRoom.1")}` },
    { value: "1.5", label: `1.5 ${t("rooms.1")}` },
    { value: "2", label: `2 ${t("rooms.1")} ` },
    { value: "2.5", label: `2.5 ${t("rooms.1")}` },
    { value: "3", label: `3 ${t("rooms.1")}` },
  ];
  const rooms2 = [
    { value: "3.5", label: `3.5 ${t("rooms.1")}` },
    { value: "4", label: `4 ${t("rooms.1")}` },
    { value: "4.5", label: `4.5 ${t("rooms.1")}` },
    { value: "5", label: `5 ${t("rooms.1")}` },
    { value: "6", label: `${t("roomate.1")}` },
  ];

  // Formik
  const initialValues = {
    owner: `${
      updatedAsset
        ? `${updatedAsset.owner}`
        : `${user.firstname} ${user.lastname}`
    }`,
    phoneNumber: `${
      updatedAsset ? `${updatedAsset.phoneNumber}` : `${user.phoneNumber || ""}`
    }`,
    email: `${updatedAsset ? `${updatedAsset.email}` : `${user.email}`}`,
    address: `${updatedAsset && `${updatedAsset.address}`}`,
    englishAddress: `${updatedAsset && `${updatedAsset.englishAddress}`}`,
    price: `${updatedAsset && `${updatedAsset.price}`}`,
    images: `${updatedAsset && `${JSON.stringify(imagesArr)}`}`,
    notes: `${
      updatedAsset && updatedAsset.notes ? `${updatedAsset.notes}` : ""
    }`,
    englishNotes: `${
      updatedAsset && updatedAsset.englishNotes
        ? `${updatedAsset.englishNotes}`
        : ""
    }`,
    description: `${
      updatedAsset && updatedAsset.description
        ? `${updatedAsset.description}`
        : ""
    }`,
    englishDescription: `${
      updatedAsset && updatedAsset.englishDescription
        ? `${updatedAsset.englishDescription}`
        : ""
    }`,
  };

  const validationSchema = Yup.object({
    owner: Yup.string().required(`${t("ownerNameError.1")}`),
    email: Yup.string().required(`${t("ownerEmailError.1")}`),
    phoneNumber: Yup.string()
      .required(`${t("ownerNPhoneError.1")}`)
      .matches(phoneRegex, `${t("ownerNPhoneError2.1")}`),
    address: Yup.string()
      .required(`${t("assetHebrewError.1")}`)
      .test(
        "isValid",
        `${
          dir === "rtl"
            ? "אנא הכנס כתובת מלאה ותקינה"
            : "Please enter valid address"
        }`,
        function(value) {
          return getLocation(value);
        }
      )
      .test("isEnglish", `${t("hebrewErr.1")}`, (value) =>
        checkisHebrew(value)
      ),
    englishAddress: Yup.string()
      .required(`${t("assetEnglishError.1")}`)
      .test("isEnglish", `${t("englishErr.1")}`, (value) =>
        checkisEnglish(value)
      ),
    price: Yup.number(`${dir === "rtl" ? "מספרים בלבד" : "Numbers only"}`)
      .required(`${t("priceError.1")}`)
      .test("Is positive?", `${t("priceMinError.1")}`, (value) => value > 0),
    notes: Yup.string()
      .max(40, `${t("notesError.1")}`)
      .test("isEnglish", `${t("hebrewErr.1")}`, (value) =>
        checkisHebrew(value)
      ),
    englishNotes: Yup.string()
      .max(40, `${t("notesError.1")}`)
      .test("isEnglish", `${t("englishErr.1")}`, (value) =>
        checkisEnglish(value)
      ),
    description: Yup.string().test(
      "isEnglish",
      `${t("hebrewErr.1")}`,
      (value) => checkisHebrew(value)
    ),
    englishDescription: Yup.string().test(
      "isEnglish",
      `${t("englishErr.1")}`,
      (value) => checkisEnglish(value)
    ),
  });

  const checkisHebrew = (value) => {
    console.log(value);
    var ltrChars =
        "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
        "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF",
      rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC",
      rtlDirCheck = new RegExp("^[^" + ltrChars + "]*[" + rtlChars + "]");
    return rtlDirCheck.test(value);
  };
  const checkisEnglish = (value) => {
    var ltrChars =
        "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
        "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF",
      rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC",
      rtlDirCheck = new RegExp("^[^" + ltrChars + "]*[" + rtlChars + "]");
    return !rtlDirCheck.test(value);
  };

  // Handle the date state
  const handleEnterDateChange = (date) => setEnterDate(date);
  const handleExitDateChange = (date) => setExitDate(date);

  // Handle rooms and time states
  const handleTimeChange = (e, index) => setTimeValue(index);
  const handleRoomsChange = (e, index) => setRoomsValue(index);

  function isBefore(date1, date2) {
    if (date1 > date2 || date1.toDateString() === date2.toDateString())
      return false;
    return true;
  }

  // Handle image change
  const handleChangeImage = (e, setFieldValue) => {
    setImageName(e.target.files[0].name);
    const reader = new FileReader();
    if (e.target.files.length === 0) {
      setImageName("");
      setFieldValue("images", "");
    } else {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFieldValue("images", [
          ...imagesArr,
          { image: reader.result, name: e.target.files[0].name },
        ]);
        setGalleryImages([
          ...galleryImages,
          {
            original: reader.result,
            thumbnail: reader.result,
            originalHeight: "300px",
            originalWidth: "200px",
            thumbnailHeight: "100px",
            thumbnailWidth: "100px",
          },
        ]);
        setImagesArr([
          ...imagesArr,
          { image: reader.result, name: e.target.files[0].name },
        ]);
      };
    }
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const makeAssetObj = (values, pricePer) => {
    return {
      id: updatedAsset ? updatedAsset._id : null,
      ...values,
      enterDate: setReadableDate(enterDate),
      exitDate: setReadableDate(exitDate),
      roomsNumber: roomsValue,
      pricePer,
      isSublet: isSublet === "0" ? false : true,
      userId: user._id,
      updatedOn: moment().format("L"),
      pricePerMonth: caculatePricePerMonth(values.price, pricePer),
      area,
      notApproved,
    };
  };

  const caculatePricePer = () => {
    return timeValue === 0
      ? "ליום"
      : timeValue === 1
      ? "לשבוע"
      : timeValue === 2
      ? "לחודש"
      : "לכל התקופה";
  };

  const finishProccess = (asset, message) => {
    if (asset) {
      setModalOpen(true);
      setOpenAlert(false);
      setbuttonDisabled(false);
    } else {
      setMessage(message);
      setOpenAlert(true);
      setbuttonDisabled(false);
    }
    setIsLoading(false);
  };

  // Submit the new asset and add to database
  const handeSubmit = async (values) => {
    try {
      if (!isBefore(enterDate, exitDate)) {
        toastify("ERROR", `${t("dateBeforeError.1")}`);
        return;
      }
      setIsLoading(true);
      setbuttonDisabled(true);
      const pricePer = caculatePricePer();
      const assetObj = makeAssetObj(values, pricePer);
      if (updatedAsset) {
        dispatch(updateAsset(assetObj))
          .unwrap()
          .then(({ asset, message }) => {
            finishProccess(asset, message);
          });
      } else {
        dispatch(addAsset(assetObj))
          .unwrap()
          .then(({ asset, message }) => {
            finishProccess(asset, message);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Caculate the price per month
  const caculatePricePerMonth = (price, pricePer) => {
    let pricePerMonth = price;
    pricePer === "ליום"
      ? (pricePerMonth = price * 30)
      : pricePer === "לשבוע"
      ? (pricePerMonth = price * 4.3)
      : pricePer === "לכל התקופה"
      ? (pricePerMonth =
          Math.round(price / caculateDaysBetween(enterDate, exitDate)) * 30)
      : (pricePerMonth = price);
    return pricePerMonth;
  };

  // Caculate the days(helper fucntion to the function above)
  const caculateDaysBetween = (startDate, endDate) => {
    // To calculate the time difference of two dates
    const Difference_In_Time = endDate.getTime() - startDate.getTime();
    // To calculate the no. of days between two dates
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
  };

  // Make the date readable
  const setReadableDate = (date, bool) => {
    let newDateArr;
    if (bool) newDateArr = date.split("/");
    else newDateArr = date.toLocaleDateString().split("/");
    let temp = newDateArr[0];
    newDateArr[0] = newDateArr[1];
    newDateArr[1] = temp;
    return newDateArr.join("/");
  };

  // Delete image from the gallery
  const deleteImage = (e, index, setFieldValue) => {
    e.preventDefault();
    const newGalleryArr = galleryImages.filter((image, i) => i !== index);
    setGalleryImages(newGalleryArr);
    const newImagesArr = imagesArr.filter((image, i) => i !== index);
    setFieldValue("images", newImagesArr);
    setImagesArr(newImagesArr);
    setImageName("");
  };

  // Delete asset
  const deleteAsset = async () => {
    const deletedAssetId = location.state.asset._id;
    dispatch(deleteApprovedAsset(deletedAssetId))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          setDeletedmodalOpen(true);
        }
      });
  };

  const checkIfSure = (whatType, values) => {
    setType(whatType);
    if (whatType === "upload") {
      setModalMessage(`${t("areUsureUpload.1")}`);
      setFunctionToExcute(() => () => handeSubmit(values));
    } else if (whatType === "update") {
      setModalMessage(`${t("areUsureUpdate.1")}`);
      setFunctionToExcute(() => () => handeSubmit(values));
    } else if (whatType === "delete") {
      setModalMessage(`${t("areUsureDelete.1")}`);
      setFunctionToExcute(() => () => deleteAsset());
    }
    setAreYouSureModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    if (location.pathname.includes("/update")) {
      // Check if we are updating or uploading
      dispatch(getAssetById(id))
        .unwrap()
        .then(({ asset }) => {
          if (asset.userId._id === user._id) {
            // make sure that the user that update is the owner
            setIsUpdate(true);
            if (asset.notApproved) setNotApproved(true);
            const newImagesArr = [];
            const newGalleryArr = [];
            setUpdatedAsset(asset);
            setEnterDate(new Date(setReadableDate(asset.enterDate, true)));
            setExitDate(new Date(setReadableDate(asset.exitDate, true)));
            asset.pricePer === "לכל התקופה"
              ? setTimeValue(3)
              : asset.pricePer === "לחודש"
              ? setTimeValue(2)
              : asset.pricePer === "לשבוע"
              ? setTimeValue(1)
              : asset.pricePer === "ליום"
              ? setTimeValue(0)
              : setTimeValue(0);
            asset.isSublet ? setIsSublet("1") : setIsSublet("0");
            setRoomsValue(asset.roomsNumber);
            setArea(asset.area);
            asset.images.forEach((image) => {
              newImagesArr.push({
                image: image.image,
                name: image.imageName,
              });
              newGalleryArr.push({
                original: image.image,
                thumbnail: image.image,
                originalHeight: "300px",
                originalWidth: "200px",
                thumbnailHeight: "100px",
                thumbnailWidth: "100px",
              });
            });
            setGalleryImages([...newGalleryArr]);
            setImagesArr([...newImagesArr]);
          } else {
            navigate("/upload");
          }
          setIsLoading(false);
        });
    } else {
      setIsUpdate(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {user.isVerified ? (
        <Grid
          dir={dir}
          item
          xs={10}
          md={6}
          component={Paper}
          square
          className={classes.formGrid}
        >
          <div className={classes.paper} dir={dir}>
            <h1 className="header myasset_header">
              {isUpdate
                ? `${t("updateProperty.1")}`
                : `${t("uploadProperty.1")}`}
            </h1>
            <img
              src="https://static.crozdesk.com/web_app_library/providers/logos/000/005/518/original/easyrent-1559230516-logo.png?1559230516"
              width="100"
              height="100"
              crop="scale"
              alt="cart"
            />
            {dir === "rtl" ? (
              <h5 className="signup_header">
                שלום {user.firstname}, על מנת{" "}
                {updatedAsset ? " לעדכן את הנכס הנבחר" : " להעלות נכס חדש לאתר"}
                , אנא מלא את הפרטים הבאים:
              </h5>
            ) : (
              <h5 className="signup_header">
                Hello {user.firstname}, in order to{" "}
                {updatedAsset ? " update the asset" : " upload new asset"}{" "}
                please fill the details:
              </h5>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {(props) => (
                <form className={classes.form} autoComplete="off" dir={dir}>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={`*${t("ownerName.1")}`}
                    name="owner"
                    {...props.getFieldProps("owner")}
                    {...errorHelper(props, "owner")}
                  />
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={`*${t("phoneNumber.1")}`}
                    name="phoneNumber"
                    {...props.getFieldProps("phoneNumber")}
                    {...errorHelper(props, "phoneNumber")}
                  />

                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label={`*${t("email.1")}`}
                    name="email"
                    {...props.getFieldProps("email")}
                    {...errorHelper(props, "email")}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        dir === "rtl" ? "column" : "column-reverse",
                    }}
                  >
                    {/* Hebrew address */}
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label={`*${t("hebrewAddress.1")}`}
                      name="address"
                      {...props.getFieldProps("address")}
                      {...errorHelper(props, "address")}
                      ref={addressRef}
                    />
                    {/* English address */}
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label={`*${t("englishAddress.1")}`}
                      name="addressEnglish"
                      {...props.getFieldProps("englishAddress")}
                      {...errorHelper(props, "englishAddress")}
                      ref={addressRef}
                    />
                  </div>

                  <label className="time_label">*{t("target.1")}:</label>
                  <RadioGroup
                    value={isSublet}
                    onChange={(e) => {
                      setIsSublet(e.target.value);
                      if (e.target.value === "0") {
                        setExitDate(
                          new Date(
                            new Date().setFullYear(new Date().getFullYear() + 1)
                          )
                        );
                        setTimeValue(2);
                      } else {
                        setExitDate(new Date());
                        setTimeValue(3);
                      }
                    }}
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={`${t("Sublet.1")}`}
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label={`${t("Rent.1")}`}
                    />
                  </RadioGroup>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.textField}
                      disablePast
                      label={`${t("enterdate.1")}`}
                      value={enterDate ? enterDate : null}
                      format="dd/MM/yyyy"
                      onChange={handleEnterDateChange}
                      minDateMessage={`${t("enterdateError.1")}`}
                    />
                    <KeyboardDatePicker
                      className={classes.textField}
                      disablePast
                      label={`${t("exitdate.1")}`}
                      format="dd/MM/yyyy"
                      value={exitDate ? exitDate : null}
                      onChange={handleExitDateChange}
                      minDateMessage={`${t("exitdateError.1")}`}
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    type="number"
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    min="0"
                    label={`*${t("price.1")}`}
                    name="price"
                    {...props.getFieldProps("price")}
                    {...errorHelper(props, "price")}
                  />
                  <label className="time_label">*{t("priceFor.1")}:</label>
                  <Tabs
                    value={timeValue}
                    onChange={handleTimeChange}
                    style={{ margin: "0px 10px", flexWrap: "wrap" }}
                  >
                    <Tab label={`${t("dayPrice.1")}`} {...a11yProps(3)} />
                    <Tab label={`${t("weekPrice.1")}`} {...a11yProps(2)} />
                    <Tab label={`${t("monthPrice.1")}`} {...a11yProps(1)} />
                    <Tab label={`${t("allPeriodPrice.1")}`} {...a11yProps(0)} />
                  </Tabs>

                  {/* Area */}
                  <label className="time_label">*{t("location.1")}:</label>

                  <Select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    displayEmpty
                    className={classes.select}
                    inputProps={{ "aria-label": "Without label" }}
                    fullWidth
                  >
                    <MenuItem value="0" disabled>
                      {t("enterArea.1")}
                    </MenuItem>
                    {menuItem.map(({ value, label }, i) => (
                      <MenuItem key={i} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className={classes.helperText}>
                    {t("enterAreahelperText.1")}
                  </FormHelperText>

                  {/* Number of rooms */}
                  <label className="time_label">*{t("maxRooms.1")}:</label>
                  <RadioGroup
                    value={roomsValue}
                    onChange={(e) => setRoomsValue(e.target.value)}
                  >
                    <div className={classes.roomsTab}>
                      {rooms1.map(({ value, label }, i) => (
                        <FormControlLabel
                          key={i}
                          value={value}
                          label={label}
                          control={<Radio />}
                        />
                      ))}
                    </div>
                    <div className={classes.roomsTab}>
                      {rooms2.map(({ value, label }, i) => (
                        <FormControlLabel
                          key={i}
                          value={value}
                          label={label}
                          control={<Radio />}
                        />
                      ))}
                    </div>
                  </RadioGroup>

                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        dir === "rtl" ? "column" : "column-reverse",
                    }}
                  >
                    <div>
                      {/*Hebrew Notes */}
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={`${t("hebrewNotes.1")}:`}
                        name="notes"
                        {...props.getFieldProps("notes")}
                        {...errorHelper(props, "notes")}
                      />
                      {dir === "rtl" && (
                        <FormHelperText className={classes.helperText}>
                          {t("notesHelperText.1")}
                        </FormHelperText>
                      )}
                    </div>
                    <div>
                      {/*English Notes */}
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label={`${t("englishNotes.1")}:`}
                        name="englishNotes"
                        {...props.getFieldProps("englishNotes")}
                        {...errorHelper(props, "englishNotes")}
                      />
                      {dir !== "rtl" && (
                        <FormHelperText className={classes.helperText}>
                          {t("notesHelperText.1")}
                        </FormHelperText>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        dir === "rtl" ? "column" : "column-reverse",
                    }}
                  >
                    {/* hebrew Description */}
                    <div>
                      <FormLabel className={classes.formLabel}>
                        {t("hebrewDescription.1")}:
                      </FormLabel>
                      <TextareaAutosize
                        className={classes.textArea}
                        rowsMin={3}
                        placeholder={
                          dir === "rtl" && `${t("descriptionHelperText.1")}`
                        }
                        {...props.getFieldProps("description")}
                        {...errorHelper(props, "description")}
                      />
                    </div>
                    <div>
                      {/* english Description */}
                      <FormLabel className={classes.formLabel}>
                        {t("englishdescription.1")}:
                      </FormLabel>
                      <TextareaAutosize
                        className={classes.textArea}
                        rowsMin={3}
                        placeholder={
                          dir !== "rtl" && `${t("descriptionHelperText.1")}`
                        }
                        {...props.getFieldProps("englishDescription")}
                        {...errorHelper(props, "englishDescription")}
                      />
                    </div>
                  </div>

                  {/* Image */}
                  <label className="time_label">* {t("images.1")}:</label>

                  <Input
                    multiple
                    id="file"
                    type="file"
                    name="images"
                    onChange={(e) =>
                      handleChangeImage(e, props.setFieldValue, props)
                    }
                    hidden
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    style={{ display: "block", margin: "10px 10px" }}
                    color="primary"
                    variant="outlined"
                  >
                    <ImageIcon className="" />
                    <label htmlFor="file">
                      {imageName
                        ? `${imageName} ${dir === "rtl" ? "עלתה" : "uploaded"}`
                        : `${t("uploadNewImage.1")}`}{" "}
                    </label>
                  </Button>
                  <FormHelperText style={{ margin: "5px 9px 5px" }}>
                    {t("imagesHelperText.1")}
                    <a
                      style={{ color: "black" }}
                      href="https://www.iloveimg.com/resize-image"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      {t("nextLink.1")}
                    </a>
                  </FormHelperText>

                  {/* Image Gallery */}
                  {galleryImages.length !== 0 && (
                    <div className="ab">
                      <ImageGallery
                        items={galleryImages}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        isRTL={true}
                        ref={galleryRef}
                        originalClass="gallery_image"
                      />
                      <button
                        type="button"
                        className="middle btn btn-danger p-2"
                        onClick={(e) =>
                          deleteImage(
                            e,
                            galleryRef.current.getCurrentIndex(),
                            props.setFieldValue
                          )
                        }
                      >
                        {dir === "rtl" ? "לחץ למחיקה" : "Delete"}
                      </button>
                    </div>
                  )}
                  {props.errors.image && props.touched.image ? (
                    <div className="error">{props.errors.image}</div>
                  ) : null}

                  {/* Error Alert */}
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
                  <Button
                    disabled={
                      area !== "0" &&
                      props.values.price &&
                      !props.errors.price &&
                      props.values.owner &&
                      props.values.address &&
                      !props.errors.address &&
                      props.values.englishAddress &&
                      !props.errors.englishAddress &&
                      props.values.phoneNumber &&
                      imagesArr.length !== 0 &&
                      !buttonDisabled
                        ? false
                        : true
                    }
                    className="m-3"
                    style={{ width: `${updatedAsset ? "44%" : "95%"}` }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      checkIfSure(
                        updatedAsset ? "update" : "upload",
                        props.values
                      )
                    }
                  >
                    {updatedAsset
                      ? `${t("updateProperty.1")}`
                      : `${t("uploadProperty.1")}`}
                  </Button>
                  {updatedAsset && (
                    <Button
                      className="m-3"
                      style={{ width: "44%" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => checkIfSure("delete")}
                    >
                      {t("deleteProperty.1")}
                    </Button>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </Grid>
      ) : (
        <>
          <AlertBox />
        </>
      )}
      {/* Modals */}
      <AssetUploadedModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isUpdate={isUpdate}
      />
      <AssetDeletedModal
        DeletedmodalOpen={DeletedmodalOpen}
        message={
          dir === "rtl"
            ? "הנכס נמחק מהאתר בהצלחה!"
            : "The property deleted successfully"
        }
      />
      <AreYouSureModal
        modalOpen={areYouSureModal}
        setModalOpen={setAreYouSureModal}
        message={modalMessage}
        functionToExcute={functionToExcute}
        modalType={type}
      />
      {isLoading && <Loader />}
    </>
  );
};

export default UploadAsset;
