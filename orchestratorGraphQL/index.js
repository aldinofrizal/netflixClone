const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const {Movie, resolvers : movieResolvers} = require('./schemas/movie')
const {TvSerie , resolvers : tvSerieResolvers} = require('./schemas/tvSeries')

const Query = gql`
    type Query { 
        tvSeries : [TvSerie]
        movies : [Movie]
    }

    type Mutation { 
        addMovie (title: String, overview: String, poster_path: String, popularity: Int, tags: [String] ): Movie
        deleteMovie (id: String) : DeleteResponse
        updateMovie (id: String, title: String) : UpdateResponse
        addTvSerie (title: String, overview: String, poster_path: String, popularity: Int, tags: [String] ): TvSerie
        deleteTvSerie (id: String) : DeleteResponse
        updateTvSerie (id: String, title: String) : UpdateResponse
    }

    type DeleteResponse { 
        n: Int
        ok: Int
        deletedCount: Int
    }

    type UpdateResponse { 
        n: Int
        ok: Int
        nModified: Int
    }

`

const schema = makeExecutableSchema({
    typeDefs: [Query, Movie, TvSerie],
    resolvers : [movieResolvers,tvSerieResolvers]
});

const server = new ApolloServer({schema});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
