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

exports.updateWood = async (req, res) => {
  try {
    const woodToUpdate = await Wood.findOne({ where: { id: req.params.id } })

    woodToUpdate.set({
      ...req.body
    })

    console.log(woodToUpdate)

    await woodToUpdate.save()
    res.status(201).json(woodToUpdate)
  } catch (e) {
    res.status(500).json(e)
  }
}