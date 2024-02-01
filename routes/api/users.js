const usersController = require("controllers/api/users");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/", tokenHelper.authenticateEntity, usersController.getUsers);
router.get("/profile", tokenHelper.authenticateEntity, usersController.getUserProfile);
router.put("/profile", tokenHelper.authenticateEntity, usersController.updateUserProfile);


module.exports = router;
