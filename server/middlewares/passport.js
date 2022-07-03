const User = require("../db/models/user_schema");
require("dotenv").config();
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const jwtOptions = {
  secretOrKey: "slbjdlk23kdlkf34223r",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  // the payload is the decoded token, done is a callback
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = { jwtStrategy };
