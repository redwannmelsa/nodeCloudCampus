const models = require('../models')
const Wood = models.Wood

exports.listWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll()
    res.send(woods)
  } catch (e) {
    res.send(e)
  }
}