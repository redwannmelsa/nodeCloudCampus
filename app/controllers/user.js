const { User } = require('../models')

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds)
    })
    res.status(201).json(newUser)
  } catch (e) {
    res.status(500).json(e)
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user == null) {
      res.status(404).json({
        error: 'User not found'
      })
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password)
      if (!valid) {
        res.status(401).json({ error: 'Wrong password' })
      } else {
        res.status(200).json({
          jwt: jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
            'fozjegonezog')
        })
      }
    }
  } catch (e) {
    res.status(500).json(e)
  }
}