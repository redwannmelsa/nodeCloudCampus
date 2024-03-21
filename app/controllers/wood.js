const { parse } = require('dotenv')
const { Wood } = require('../models')
const fs = require('fs')
const woodHateoas = require('../utils/woodHateoas')

exports.readWoods = async (req, res) => {
  console.log(woodHateoas)
  try {
    let woods = await Wood.findAll()
    res.status(200).json(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks(woods)))
  } catch (e) {
    res.status(400).json(woodHateoas.globalWoodHateoas(e.message))
  }
}

exports.readWoodsByHardness = async (req, res) => {
  try {
    let woods = await Wood.findAll({
      where: {
        hardness: req.params.hardness
      }
    })

    res.status(200).send(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks(woods)))
  } catch (e) {
    res.status(400).json(woodHateoas.globalWoodHateoas(e.message))
  }
}

exports.createWood = async (req, res) => {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const newWood = await Wood.create({
      ...JSON.parse(req.body.datas),
      image: pathname,
    })

    res.status(201).json(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks([newWood])))
  } catch (e) {
    res.status(500).json(woodHateoas.globalWoodHateoas(e))
  }
}

exports.updateWood = async (req, res) => {
  try {
    const woodToUpdate = await Wood.findOne({ where: { id: req.params.id } })
    let newPathName = null

    if (req.file != null) {
      newPathName = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      deleteImageIfNeeded(woodToUpdate)
    }

    woodToUpdate.set({
      ...JSON.parse(req.body.datas),
      image: newPathName ? newPathName : woodToUpdate.image
    })

    await woodToUpdate.save()
    res.status(200).json(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks([woodToUpdate])))
  } catch (e) {
    res.status(500).json(woodHateoas.globalWoodHateoas(e.message))
  }
}

exports.deleteWood = async (req, res) => {
  try {
    const woodToDelete = await Wood.findOne({ where: { id: req.params.id } })

    if (woodToDelete == null) {
      res.status(404).json({ error: 'wood not found' })
    } else {
      deleteImageIfNeeded(woodToDelete)
      await woodToDelete.destroy()
      res.status(204).send()
    }

  } catch (e) {
    res.status(500).json(woodHateoas.globalWoodHateoas(e.message))
  }
}

function deleteImageIfNeeded(wood) {
  if (wood.image != null) {
    fs.unlink('uploads/' + wood.image.match(/[^\/]+$/)[0], err => console.log(err))
  }
}