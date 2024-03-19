const { User } = require('../models')

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');

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
        res.json(newUser)
      }
    });
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  console.log('here', user)

  if (user == null) {
    res.status(400)
    res.json({
      error: 'User not found'
    })
  } else {
    bcrypt.compare(req.body.password, user.password, (err, bcryptRes) => {
      if (err || !bcryptRes) {
        res.status(401)
        res.json({ error: 'Wrong password' })
      } else {
        res.status(200)
        res.json({
          jwt: jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
            'shhhhh')
        })
      }
    })
  }
}