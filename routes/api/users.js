const usersController = require("controllers/api/users");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/", tokenHelper.authenticateEntity, usersController.getUsers);
router.get("/fetch-medical-data", tokenHelper.authenticateEntity, usersController.fetchMedicalData);

module.exports = router;
