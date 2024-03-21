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
      if (woodToUpdate.image != null) {
        console.log(woodToUpdate.image.match(/[^\/]+$/)[0])
        fs.unlink('uploads/' + woodToUpdate.image.match(/[^\/]+$/)[0], err => { if (err) console.log(err) })
      }
    }

    woodToUpdate.set({
      ...JSON.parse(req.body.datas),
      image: newPathName ? newPathName : woodToUpdate.image
    })

    await woodToUpdate.save()
    res.status(201).json(woodHateoas.globalWoodHateoas(woodHateoas.mapWoodsWithHateoasLinks([woodToUpdate])))
  } catch (e) {
    res.status(500).json(woodHateoas.globalWoodHateoas(e.message))
  }
}