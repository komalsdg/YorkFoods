const express = require("express");
const router = express.Router();

const users = require("./users");
const registrations = require("./registrations");
const restaurants = require("./restaurants");
const sessions = require("./sessions");
const menuItems = require("./menuItems");
const orders = require("./orders");
const review = require("./review");
const search = require("./search");

router.use("/users", users);
router.use("/register", registrations);
router.use("/restaurants", restaurants);
router.use("/", sessions);
router.use("/", menuItems);
router.use("/", orders);
router.use("/", review);
router.use("/", search);

module.exports = router;
