const searchController = require("controllers/api/search");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/search", tokenHelper.authenticateEntity, searchController.search);

module.exports = router;