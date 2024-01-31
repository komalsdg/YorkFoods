const ordersController = require("controllers/api/orders");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/users/orders", tokenHelper.authenticateEntity, ordersController.getUserOrders);

module.exports = router;