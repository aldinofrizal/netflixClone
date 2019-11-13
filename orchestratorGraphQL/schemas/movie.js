const { gql } = require('apollo-server')
const Axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const Movie = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
    }

`

const resolvers = {
    Query : { 
        movies : async (parent, args, context) =>  {
            const dataCache = await redis.get('movieCache')
            if(dataCache){
                return JSON.parse(dataCache)
            }else{
                const { data } = await Axios({ 
                    method : 'get',
                    url : 'http://localhost:3001/'
                })
                redis.set('movieCache' , JSON.stringify(data.data))
                return data.data
            }
        }
    },

    Mutation : {
        addMovie : async (parent, args) => {
            const { data } = await Axios({
                method : 'post',
                url : 'http://localhost:3001/',
                data : args
            })
            redis.del('movieCache')
            return data.movie
        },

        deleteMovie : async (parent, args) => {
            const { data } = await Axios({
                method : 'delete',
                url : `http://localhost:3001/${args.id}`
            })
            redis.del('movieCache')
            return data.deletedStatus
        },

        updateMovie : async (parent, args) => {
            const { data } = await Axios({
                method : 'patch',
                url : `http://localhost:3001/${args.id}`,
                data : args
            })
            redis.del('movieCache')
            return data.updateStatus
        }
    }

    
}
module.exports = {Movie,resolvers}