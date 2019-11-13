const TvSeries = require('../models/tvSeries')

class Controller {
    static find(req,res,next){
        TvSeries.find()
        .then( tvseries => {
            res.status(200).json({ info : 'tv found successfully' , data : tvseries  })
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log(req.body)
        const { title, overview, poster_path, popularity } = req.body
        TvSeries.create({
            title, overview, poster_path, popularity
        })
        .then( tvSerie => {
            console.log(tvSerie, 'llllllllllllllllllllllllllll')
            res.status(201).json({tvSerie})
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
        TvSeries.updateOne( { _id : req.params.id } , updateValue )
        .then( updateStatus => {
            res.status(200).json({ updateStatus })
        })  
        .catch(next)
    }

    static deleteMov(req,res,next){
        TvSeries.deleteOne({ _id : req.params.id })
        .then( deletedStatus => {
            res.status(200).json({deletedStatus})
        })
        .catch(next)
    }
}

module.exports = Controller