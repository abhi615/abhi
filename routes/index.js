const express = require('express');
const router =express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',forwardAuthenticated, (req, res)=>res.render('welcome'));
// Dashboard
router.get('/dasboard', ensureAuthenticated, (req, res) =>
  res.render('dasboard', {
    user: req.user
  })
);


module.exports = router;