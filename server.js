const express = require('express')
require('./src/models/connection')
const dotenv = require('dotenv')
const routes = require("./src/routes/index")
const app = express()
dotenv.config()

app.use(express.json())

app.use('/',routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server is on ${PORT}`)
})