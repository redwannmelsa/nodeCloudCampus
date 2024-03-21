const express = require('express')
const router = express();

const woodCtrl = require("../controllers/wood.js")

const auth = require('../middleware/auth.js')
const multer = require('../middleware/multer.js')

router.get('/', auth, woodCtrl.readWoods)
router.get('/byHardness/:hardness', woodCtrl.readWoodsByHardness)
router.post('/', auth, multer, woodCtrl.createWood)
router.patch('/:id', multer, woodCtrl.updateWood)
router.delete('/:id', woodCtrl.deleteWood)

module.exports = router;