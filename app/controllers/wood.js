const { Wood } = require('../models')
const fs = require('fs')

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

exports.deleteWood = async (req, res) => {
  try {
    const woodToDelete = await Wood.findOne({ where: { id: req.params.id } })

    if (woodToDelete == null) {
      res.status(404).json({ error: 'wood not found' })
    } else {

      if (woodToDelete.image != null) {
        fs.unlink('uploads/' + woodToDelete.image.match(/[^\/]+$/)[0], err => console.log(err))
      }

      await woodToDelete.destroy()
      res.status(200).json({ message: 'wood has been deleted' })
    }

  } catch (e) {
    res.status(500).json(e)
  }
}