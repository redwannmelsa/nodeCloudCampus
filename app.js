const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')

const db = require("./app/models/index.js");
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log(err));

app.use(express.json());

const whitelist = ['http://example1.com', 'http://example2.com', 'http://localhost:3000']
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

const router = require("./app/routes/index.js");
//Ajout des routes
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;