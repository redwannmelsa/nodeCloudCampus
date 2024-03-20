const express = require('express');
const router = express();

const userCtrl = require("../controllers/user.js");

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.login);

module.exports = router;
