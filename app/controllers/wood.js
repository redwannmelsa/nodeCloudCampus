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

exports.createWood = async (req, res) => {
  try {
    console.log(req.body.datas)
    console.log(req.file)
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const newWood = await Wood.create({
      ...JSON.parse(req.body.datas),
      image: pathname,
    })
    res.status(201).json(newWood)
  } catch (e) {
    res.status(500).json(e)
  }
}