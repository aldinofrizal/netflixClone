import React from 'React'
import { View, FlatList, Text } from 'react-native'
import Card from './card'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const QUERY_MOVIES = gql`
    query {
        movies { 
            title,
            overview,
            poster_path,
            _id
        }
    }
`


export default SwipeMovie = (props) => {
    const { loading, error, data } = useQuery(QUERY_MOVIES)
    if(loading){
        return (
            <Text>loading ... </Text>
        )
    }else{
        return (
            <>  
                <View style={{ flex : .5, justifyContent : 'center', }}>
                    <Text style={{ fontWeight : "bold" , fontSize : 18, textAlign : 'center' }}>
                        POPULAR MOVIES
                    </Text>
                    <FlatList
                        data={data.movies}
                        renderItem={(item) => <Card item={item} {...props} /> }
                        keyExtractor={item => item._id}
                        horizontal={true}
                    />
                    
                </View>
            </>
        )
    }
}
