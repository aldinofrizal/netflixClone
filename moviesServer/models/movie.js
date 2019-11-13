const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movies = new Schema({
    title : {
        type : String,
        required : [true, 'title required']
    },
    overview : {
        type : String,
        required : [true, 'overview required']
    },
    poster_path : {
        type : String,
        required : [true, 'poster path required']
    },
    popularity : {
        type : Number,
        default : 0
    },
    tag : {
        type : Array
    }
})

const Model = mongoose.model('movie', Movies)
module.exports = Model