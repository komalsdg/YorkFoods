const express = require('express');
 const router = express.Router();

 const users = require('./users');
 const registrations = require('./registrations');
 const restaurants = require('./restaurants');
 const sessions = require('./sessions');

 router.use('/users', users);
 router.use('/register', registrations);
 router.use('/restaurants', restaurants);
 router.use('/', sessions);

 module.exports = router; 