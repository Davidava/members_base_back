require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const { routes } = require("./src/routes")
const jwtCheck = require("./src/utils/jwtCheck");

mongoose.connect(
    process.env.MONGO_URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false, 
    }
)

const PORT = 3000
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(jwtCheck)


routes.forEach((item) => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})

http.createServer({}, app).listen(3000)
console.log(`Server runnnin at ${PORT}`)