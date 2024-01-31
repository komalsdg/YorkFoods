const menuItemsController = require("controllers/api/menuItems");
const express = require("express");
const router = express.Router();
const tokenHelper = require('../../helpers/token');


router.get("/:id", tokenHelper.authenticateEntity, menuItemsController.getMenuItemsByRestaurants);
router.put("/", tokenHelper.authenticateEntity, menuItemsController.updateMenuItem);
router.delete("/:id", tokenHelper.authenticateEntity, menuItemsController.archiveMenuItem);

module.exports = router;