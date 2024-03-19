const express = require('express');
const router = express();

const woodCtrl = require("../controllers/wood.js");

router.get('/listWoods', woodCtrl.listWoods);
router.get('/woods/:hardness', woodCtrl.getWoodsByHardness)

module.exports = router;