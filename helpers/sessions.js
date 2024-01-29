const config = require("config");
const crypto = require("crypto");
const lodash = require("lodash");
const jwt = require("jsonwebtoken");

module.exports.generateSessionToken = () => {
  const currentDate = new Date().valueOf().toString();
  const random = Math.random().toString();
  return crypto
    .createHash("sha1")
    .update(currentDate + random)
    .digest("hex");
};

module.exports.generateJWT = ({ session, user }) => {
  const payload = {
    sessionId: session.id,
    user: lodash.pick(user, ["id", "firstName", "lastName", "email"]),
  };
  return jwt.sign(payload, config.sessionSecret);
};

module.exports.decodeJWT = (header) => {
  const token = header.split(" ")[1];
  var decoded = jwt.verify(token, config.sessionSecret);
  return decoded;
};
