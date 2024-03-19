const models = require('../models')
const User = models.User

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
        res.send(newUser)
      }
    });
  } catch (e) {
    res.send(e)
  }
}

exports.login = (req, res) => {

  res.send('You are logged in')
}