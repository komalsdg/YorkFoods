const userRegistrationsController = require("controllers/api/userRegistrations");
const restaurantRegistrationsController = require("controllers/api/restaurantRegistrations");
const express = require("express");
const router = express.Router();

router.post("/user", userRegistrationsController.registerUser);
router.post("/restaurant", restaurantRegistrationsController.registerRestaurant);

module.exports = router;
