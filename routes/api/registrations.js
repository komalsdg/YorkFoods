const regsitrationsController = require("controllers/api/registrations");
const express = require("express");
const router = express.Router();

router.post("/register", regsitrationsController.registerUser);

module.exports = router;
