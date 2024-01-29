const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authenticateUser: async (req, res, next) => {
    const token = req.get("X-Auth-Token");
    const email = req.get("X-Auth-Email");
    let user =
      email &&
      (await prisma.user.findUnique({
        where: { email: email },
      }));

    if (
      user != null &&
      token === user.authenticationToken &&
      verifyToken(token) &&
      user.isBlocked === false
    ) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        error: "Could not authenticate with the provided credentials",
      });
    }
  },

  createToken: (email) => {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return token;
  },
};

const verifyToken = (token) => {
  var status;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      status = false;
    } else {
      status = true;
    }
  });

  return status;
};
