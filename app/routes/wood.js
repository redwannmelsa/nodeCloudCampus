const express = require('express');
const router = express();

const woodCtrl = require("../controllers/wood.js");
const auth = require('../middleware/auth.js')

router.get('/listWoods', auth, woodCtrl.readWoods);
router.get('/byHardness/:hardness', auth, woodCtrl.readWoodsByHardness)
router.patch('/:id', woodCtrl.updateWood)

module.exports = router;