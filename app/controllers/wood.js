const { Wood } = require('../models')

exports.listWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll()
    res.status(200)
    res.json(woods)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

exports.getWoodsByHardness = async (req, res) => {
  try {
    const woods = await Wood.findAll({
      where: {
        hardness: req.params.hardness
      }
    })
    res.status(200)
    res.send(woods)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}