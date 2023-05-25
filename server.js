const express = require('express')
// require('./src/models/connection')
const dotenv = require('dotenv')
const routes = require("./src/routes/route")
const mongoose = require('mongoose')
const app = express()
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(
    console.log('Database connected')
)


app.use('/',routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server is on ${PORT}`)
})