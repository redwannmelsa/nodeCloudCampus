const { User } = require('../models')

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (err) throw new Error('could not encrypt password')
      else {
        const newUser = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
        })
        res.status(201)
        res.send(newUser)
      }
    });
  } catch (e) {
    res.status(400)
    res.send(e)
  }
}

exports.login = (req, res) => {

  res.send('You are logged in')
}