const models = require('../models')
const User = models.User

exports.signup = async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    res.send(newUser)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
}

exports.login = (req, res) => {

  res.send('You are logged in')
}