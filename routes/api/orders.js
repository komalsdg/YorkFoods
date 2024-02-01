const ordersController = require("controllers/api/orders");
const express = require("express");
const router = express.Router();
const tokenHelper = require("../../helpers/token");

router.get(
  "/user/orders",
  tokenHelper.authenticateEntity,
  ordersController.getUserOrders
);
router.get(
  "/restaurant/orders",
  tokenHelper.authenticateEntity,
  ordersController.getRestaurantsOrders
);
router.post(
  "/orders",
  tokenHelper.authenticateEntity,
  ordersController.insertOrder
);
router.put(
  "/orders/:id",
  tokenHelper.authenticateEntity,
  ordersController.updateOrderStatus
);

module.exports = router;
