const express = require('express');
const router = express();

const userCtrl = require("../controllers/users.js");

router.post('/signup', userCtrl.signup);
router.post('/login', function (req, res) {
  res.send('You are login');
});

module.exports = router;
