const { gql } = require('apollo-server')
const Axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


const TvSerie = gql`
    type TvSerie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Int
    }
`

    
const resolvers = {
    Query : { 
        tvSeries : async () =>  { 
            const dataCache = await redis.get('tvSerieCache')
            if(dataCache){
                return JSON.parse(dataCache)
            }else{
                const { data } = await Axios({ 
                    method : 'get',
                    url : 'http://localhost:3002/'
                })
                redis.set('tvSerieCache' , JSON.stringify(data.data))
                return data.data
            }
        }
    },

    Mutation : {
        addTvSerie : async (parent, args) => {
            const { data } = await Axios({
                method : 'post',
                url : 'http://localhost:3002/',
                data : args
            })
            redis.del('tvSerieCache')
            return data.tvSerie
        },

        deleteTvSerie : async (parent, args) => {
            const { data } = await Axios({
                method : 'delete',
                url : `http://localhost:3002/${args.id}`
            })
            redis.del('tvSerieCache')
            return data.deletedStatus
        },

        updateTvSerie : async (parent, args) => {
            const { data } = await Axios({
                method : 'patch',
                url : `http://localhost:3002/${args.id}`,
                data : args
            })
            redis.del('tvSerieCache')
            return data.updateStatus
        }
    }

}
module.exports = {TvSerie,resolvers}