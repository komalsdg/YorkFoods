const usersController = require("controllers/api/users");
const express = require("express");
const router = express.Router();

router.get("/", usersController.getUsers);

module.exports = router;
