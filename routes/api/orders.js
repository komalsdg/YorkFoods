const ordersController = require("controllers/api/orders");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/users/orders", tokenHelper.authenticateEntity, ordersController.getUserOrders);
router.get("/restaurants/orders", tokenHelper.authenticateEntity, ordersController.getRestaurantsOrders);
router.post("/orders", tokenHelper.authenticateEntity, ordersController.insertOrder);
router.put("/orders/:id", tokenHelper.authenticateEntity, ordersController.updateOrderStatus);

module.exports = router;