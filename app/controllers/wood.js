const { parse } = require('dotenv')
const { Wood } = require('../models')
const fs = require('fs')
const woodHateoas = require('../utils/woodHateoas')
const utils = require('../utils/utils')

exports.readWoods = async (req, res) => {
  console.log(woodHateoas)
  try {
    let woods = await Wood.findAll()
    res.status(200).json(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks(woods)))
  } catch (e) {
    res.status(500).json({ error: e.message })
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
    res.status(500).json({ error: e.message })
  }
}

exports.createWood = async (req, res) => {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const newWood = await Wood.create({
      ...JSON.parse(req.body.datas),
      image: pathname,
    })

    res.status(201).json(woodHateoas.mapWoodsWithHateoasLinks([newWood]))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.updateWood = async (req, res) => {
  try {
    const woodToUpdate = await Wood.findOne({ where: { id: req.params.id } })
    let newPathName = null

    if (req.file != null) {
      newPathName = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      utils.deleteImageIfNeeded(woodToUpdate)
    }

    woodToUpdate.set({
      ...JSON.parse(req.body.datas),
      image: newPathName ? newPathName : woodToUpdate.image
    })

    await woodToUpdate.save()
    res.status(200).json(woodHateoas.mapWoodsWithHateoasLinks([woodToUpdate]))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.deleteWood = async (req, res) => {
  try {
    const woodToDelete = await Wood.findOne({ where: { id: req.params.id } })

    if (woodToDelete == null) {
      res.status(404).json({ error: 'wood not found' })
    } else {
      utils.deleteImageIfNeeded(woodToDelete)
      await woodToDelete.destroy()
      res.status(204).send()
    }

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}