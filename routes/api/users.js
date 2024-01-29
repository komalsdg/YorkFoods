const usersController = require("controllers/api/users");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/", tokenHelper.authenticateUser, usersController.getUsers);

module.exports = router;
