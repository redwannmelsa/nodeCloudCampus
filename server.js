require('dotenv').config()

const app = require('./app.js')
const port = process.env.PORT

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

const cors = require('cors')

const whitelist = process.env.WHITELIST.split(' ')
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

