const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
    static async findEntertain(req, res, next) {
        const entertainMeCache = await redis.get('entertainMe')
        if(entertainMeCache){
            res.status(200).json(JSON.parse(entertainMeCache))
        }else{
            const moviesDat = await axios({ method: 'get', url: 'http://localhost:3001/' })
            const movies = moviesDat.data
            const seriesDat = await axios({ method: 'get', url: 'http://localhost:3002/' })
            const series = seriesDat.data
            const entertainMe = { series, movies }
            redis.set('entertainMe' , JSON.stringify(entertainMe))
            res.status(200).json(entertainMe)
        }
    }


    static async postMovie(req,res,next){
        const { title, overview, poster_path, popularity, tag } = req.body
        try { 
            const { data } = await axios({ 
                method : 'post',
                url : 'http://localhost:3001/' , 
                data : {
                    title, overview, poster_path, popularity, tag
                 } 
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        }
        catch (err){
            res.status(err.response.status).send(err.response.data)
        }
    }

    static async postSeries(req,res,next){
        const { title, overview, poster_path, popularity, tag } = req.body
        try { 
            const { data } = await axios({ 
                method : 'post',
                url : 'http://localhost:3002/' , 
                data : {
                    title, overview, poster_path, popularity, tag
                 } 
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        }
        catch (err){ 
            res.status(err.response.status).send(err.response.data)
        }   
    }

    static async updateMovie(req,res,next){
        try { 
            const { data } = await axios({ 
                method : 'patch',
                url : `http://localhost:3001/${req.params.id}` , 
                data : req.body
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        }
        catch (err){ 
            res.status(err.response.status).send(err.response.data)
        }
    }

    static async updateSeries(req,res,next){
        try { 
            const { data } = await axios({ 
                method : 'patch',
                url : `http://localhost:3002/${req.params.id}` , 
                data : req.body
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        }
        catch (err){ 
            res.status(err.response.status).send(err.response.data)
        }
    }

    static async deleteMovie(req,res,next){
        try { 
            const { data } = await axios({ 
                method : 'delete',
                url : `http://localhost:3001/${req.params.id}` ,
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        } 
        catch (err) {
            res.status(err.response.status).send(err.response.data)
        }
    }

    static async deleteSeries(req,res,next){
        try { 
            const { data } = await axios({ 
                method : 'delete',
                url : `http://localhost:3002/${req.params.id}` , 
            })
            res.status(200).json(data)
            redis.del('entertainMe')
        }
        catch (err){ 
            res.status(err.response.status).send(err.response.data)
        }
    }
}

module.exports = Controller