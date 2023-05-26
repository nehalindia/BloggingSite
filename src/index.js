const express = require('express')
const dotenv = require('dotenv')
const routes = require("./routes/routes")
const app = express()
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(
    console.log('Database connected')
).catch(err => console.log(err.message))

app.use(express.json())

app.use('/',routes)


app.listen(process.env.PORT, () =>{
    console.log(`server is running on ${process.env.PORT}`)
})