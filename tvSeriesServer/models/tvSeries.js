const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TvSeries = new Schema({
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

const Model = mongoose.model('tvSeries', TvSeries)
module.exports = Model