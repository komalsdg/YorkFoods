const restaurantsController = require("controllers/api/restaurants");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/", tokenHelper.authenticateEntity, restaurantsController.getRestaurants);
router.get("/:id", tokenHelper.authenticateEntity, restaurantsController.getRestaurantProfile);
router.put("/", tokenHelper.authenticateEntity, restaurantsController.updateRestaurantProfile);
router.delete("/:id", tokenHelper.authenticateEntity, restaurantsController.archiveRestaurant);

module.exports = router;
