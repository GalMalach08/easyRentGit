const User = require("../db/models/user_schema");
const UserPref = require("../db/models/user_prefrences_schema");
const { sendRelevantAssetEmail } = require("./sendEmail");
const jwt = require("jsonwebtoken");

// Sort what we want to return back and save sensative info from returning back to the client
const getUserProps = (props) => {
  return {
    _id: props.id,
    email: props.email,
    firstname: props.firstname,
    lastname: props.lastname,
    phoneNumber: props.phoneNumber,
    email: props.email,
    isJustChangedPassword: props.isJustChangedPassword,
    preferences: props.preferences,
    isAdmin: props.isAdmin,
    isVerified: props.isVerified,
  };
};

// Check the user's preferences table and find users with the appropriate preferences, than send email
const checkUsersPrefrences = async (asset) => {
  const usersPref = await UserPref.find();
  usersPref.forEach(async (pref) => {
    const roomsArr = pref.roomsNumber.split("-");
    const minRoom = Number(roomsArr[0]);
    const maxRoom = Number(roomsArr[1]);
    if (
      pref.area.includes(asset.area) &&
      pref.price >= asset.pricePerMonth &&
      minRoom <= asset.roomsNumber <= maxRoom
    ) {
      const user = await User.findById(pref.userId);
      sendRelevantAssetEmail(
        user.email,
        asset,
        user.firstname,
        user.preferredLang
      );
    }
  });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, "slbjdlk23kdlkf34223r");
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserProps, checkUsersPrefrences, validateToken };
