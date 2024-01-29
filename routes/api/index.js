const express = require('express');
 const router = express.Router();

 const users = require('./users');
 const registrations = require('./registrations');
 const sessions = require('./sessions');

 router.use('/users', users);
 router.use('/users', registrations);
 router.use('/', sessions);

 module.exports = router; 