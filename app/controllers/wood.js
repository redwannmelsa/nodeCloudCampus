const { Wood } = require('../models')

exports.readWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll()
    res.status(200).json(woods)
  } catch (e) {
    res.status(400).json(e)
  }
}

exports.readWoodsByHardness = async (req, res) => {
  try {
    const woods = await Wood.findAll({
      where: {
        hardness: req.params.hardness
      }
    })
    res.status(200).send(woods)
  } catch (e) {
    res.status(400).json(e)
  }
}