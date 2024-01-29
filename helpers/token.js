const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  authenticateEntity: async (req, res, next) => {
    const token = req.get("X-Auth-Token");
    const email = req.get("X-Auth-Email");
    const type = req.get("X-Auth-Type"); //Pass either "user" or "restaurant"

    let entity;
    if (type === "user") {
      entity = await prisma.user.findUnique({ where: { email } });
    } else if (type === "restaurant") {
      entity = await prisma.restaurant.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: "Invalid entity type" });
    }

    if (
      entity &&
      token === entity.authenticationToken &&
      verifyToken(token) &&
      !entity.isBlocked
    ) {
      req.entity = entity;
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
