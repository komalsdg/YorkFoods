const usersController = require("controllers/api/users");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/", tokenHelper.authenticateEntity, usersController.getUsers);
router.get("/profile", tokenHelper.authenticateEntity, usersController.getUserProfile);
router.put("/profile", tokenHelper.authenticateEntity, usersController.updateUserProfile);
router.put("/:id/update-password", tokenHelper.authenticateEntity, usersController.updateUserPassword);


module.exports = router;
