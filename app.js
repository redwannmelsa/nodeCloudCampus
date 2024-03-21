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

const whitelist = ['http://localhost:3000']
const corsOptions = {

}

app.use(cors(corsOptions))

const router = require("./app/routes/index.js");
//Ajout des routes
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;