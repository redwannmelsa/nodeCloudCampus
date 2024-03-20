const express = require('express');
const router = express();

const woodCtrl = require("../controllers/wood.js");

router.get('/listWoods', woodCtrl.readWoods);
router.get('/byHardness/:hardness', woodCtrl.readWoodsByHardness)

module.exports = router;