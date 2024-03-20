const express = require('express');
const router = express();

const woodCtrl = require("../controllers/wood.js");
const auth = require('../middleware/auth.js')

router.get('/listWoods', auth, woodCtrl.listWoods);
router.get('/byHardness/:hardness', auth, woodCtrl.getWoodsByHardness)

module.exports = router;