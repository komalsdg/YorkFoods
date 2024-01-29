const express = require('express');
 const passport = require('passport');
 const router = express.Router();

 const users = require('./users');

//  router.use('/users', passport.authenticate('jwt', {session: false}), users);
 router.use('/users', users);

 module.exports = router; 