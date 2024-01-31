const ordersController = require("controllers/api/orders");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/users/orders", tokenHelper.authenticateEntity, ordersController.getUserOrders);
// router.post("/restaurants/menu-items", tokenHelper.authenticateEntity, menuItemsController.insertMenuItem);
// router.put("/restaurants/menu-items/:id", tokenHelper.authenticateEntity, menuItemsController.updateMenuItem);
// router.delete("/restaurants/menu-items/:id", tokenHelper.authenticateEntity, menuItemsController.archiveMenuItem);

module.exports = router;