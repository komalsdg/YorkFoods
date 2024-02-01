const searchController = require("controllers/api/search");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/search/restaurants", tokenHelper.authenticateEntity, searchController.searchRestaurantsByCuisineAndName);
router.get("/search/menu-items", tokenHelper.authenticateEntity, searchController.searchMenuItemsByName);

module.exports = router;