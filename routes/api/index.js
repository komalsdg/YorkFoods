const express = require('express');
 const router = express.Router();

 const users = require('./users');
 const registrations = require('./registrations');
 const restaurants = require('./restaurants');
 const sessions = require('./sessions');
const menuItems = require('./menuItems');
const orders = require('./orders');

 router.use('/users', users);
 router.use('/register', registrations);
 router.use('/restaurants', restaurants);
 router.use('/', sessions);
 router.use('/menuItems',menuItems);
 router.use('/orders',orders);

 module.exports = router; 