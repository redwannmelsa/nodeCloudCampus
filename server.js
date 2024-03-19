require('dotenv').config()

const app = require('./app.js')
const port = process.env.PORT

const router = require("./app/routes/index.js");
//Ajout des routes
app.use("/api", router);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

