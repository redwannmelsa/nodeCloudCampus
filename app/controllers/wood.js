const { Wood } = require('../models')

exports.listWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll()
    res.status(200)
    res.send(woods)
  } catch (e) {
    res.status(400)
    res.send(e)
  }
}

exports.getWoodsByHardness = async (req, res) => {
  const woods = await Wood.findAll()
}