const Movie = require('../models/movie')

class Controller {
    static find(req,res,next){
        Movie.find()
        .then( movies => {
            res.status(200).json({ info : 'movies found successfully' , data : movies  })
        })
        .catch(next)
    }

    static create(req,res,next){
        const { title, overview, poster_path, popularity } = req.body
        Movie.create({
            title, overview, poster_path, popularity
        })
        .then( movie => {
            res.status(201).json({movie})
        })
        .catch(next)
    }

    static update(req,res,next){
        let allowedFields = ['title' , 'overview', 'poster_path', 'popularity', 'tag']
        let updateValue = {}
        for(let key in req.body){
            allowedFields.forEach(field => {
                if(key === field) updateValue[key] = req.body[key]
            });
        }
        Movie.updateOne( { _id : req.params.id } , updateValue )
        .then( updateStatus => {
            res.status(200).json({ updateStatus })
        })  
        .catch(next)
    }

    static deleteMov(req,res,next){
        Movie.deleteOne({ _id : req.params.id })
        .then( deletedStatus => {
            res.status(200).json({deletedStatus})
        })
        .catch(next)
    }
}

module.exports = Controller