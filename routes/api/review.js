const reviewController = require("controllers/api/review");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.post("/review", tokenHelper.authenticateEntity, reviewController.addReview);
router.get("/restaurants/:id/review", tokenHelper.authenticateEntity, reviewController.getRestaurantReview);
router.get("/menu-items/:id/review", tokenHelper.authenticateEntity, reviewController.getMenuItemReview);

module.exports = router;