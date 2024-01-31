const express = require('express');
 const router = express.Router();

 const users = require('./users');
 const registrations = require('./registrations');
 const sessions = require('./sessions');
const menuItems = require('./menuItems');

 router.use('/users', users);
 router.use('/register', registrations);
 router.use('/', sessions);
 router.use('/menuItems',menuItems);

 module.exports = router; 