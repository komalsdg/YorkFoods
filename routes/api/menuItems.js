const menuItemsController = require("controllers/api/menuItems");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/restaurants/:id/menu-items", tokenHelper.authenticateEntity, menuItemsController.getMenuItemsByRestaurants);
router.post("/restaurants/menu-items", tokenHelper.authenticateEntity, menuItemsController.insertMenuItem);
router.put("/restaurants/menu-items/:id", tokenHelper.authenticateEntity, menuItemsController.updateMenuItem);
router.delete("/:id", tokenHelper.authenticateEntity, menuItemsController.archiveMenuItem);

module.exports = router;