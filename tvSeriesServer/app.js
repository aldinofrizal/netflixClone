if(process.env.NODE_ENV === 'development')require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const router = require('./router')
const errorHandler = require('./middleware/errorHandler')

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://aldinofrizal:melody2010@aldino-hacktiv8-13gz2.gcp.mongodb.net/entertainMeTvSeries?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true }, () => {
    console.log('connected to mongodb')
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))


