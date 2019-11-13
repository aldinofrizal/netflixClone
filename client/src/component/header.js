import React from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import Svg, { ClipPath, Circle, Image } from 'react-native-svg'
import { Ionicons } from '@expo/vector-icons'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window')

const MUTATION_DELETE_MOVIE = gql`
    mutation($id: String){
        deleteMovie (id : $id) {
            n
        }
    }
`
const MUTATION_DELETE_TV = gql`
    mutation($id: String){
        deleteTvSerie (id : $id) {
            n
        }
    }
`

const QUERY_TVSERIES = gql`
    query {
        tvSeries { 
            title,
            overview,
            poster_path,
            _id
        }
    }
`

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


export default Header = (props) => {
    const [deleteTvSerie, { loading : tvSerieLoading, data : tvSerieData , error : tvSerieError }] = useMutation(
        MUTATION_DELETE_TV,
    )
    const [deleteMovie, { loading : movieLoading, data : movieData, error : movieError }] = useMutation(
        MUTATION_DELETE_MOVIE,
    )
    
    const deleteItem = () => {
        const item = props.navigation.state.params.item
        if(item.__typename == "Movie"){
            deleteMovie({
                variables : {
                    id : item._id
                },
                update(cache) {
                    const { movies } = cache.readQuery({ query: QUERY_MOVIES });
                    const newData = movies.filter(tv => {
                        return tv._id !== item._id
                    })
                    cache.writeQuery({
                    query: QUERY_MOVIES,
                    data: { movies : [...newData] },
                    });
                }
            })
            props.navigation.navigate('Home')
        }else if(item.__typename == "TvSerie"){
            deleteTvSerie({
                variables : {
                    id : item._id
                },
                update(cache) {
                    const { tvSeries } = cache.readQuery({ query: QUERY_TVSERIES });
                    const newData = tvSeries.filter(tv => {
                        return tv._id !== item._id
                    })
                    cache.writeQuery({
                    query: QUERY_TVSERIES,
                    data: { tvSeries : [...newData] },
                    });
                }
            })
            props.navigation.navigate('Home')
        }
    }

    return (
        <View style={{ flex: 0.09, justifyContent: 'center', alignItems: 'center', marginBottom: 30, paddingBottom: 20, marginTop: Constants.statusBarHeight - 15 }}>
            <Svg height={'150%'} width={'100%'} >
                <ClipPath id="clip" >
                    <Circle r={'100%'} cx={width / 2} />
                </ClipPath>
                <Image
                    href={require('../../assets/bg2.jpg')}
                    width={'100%'}
                    height={'130%'}
                    preserveAspectRatio="xMidYmid slice"
                    clipPath="url(#clip)"
                />
            </Svg>
            {
                (props.navigation.state.params) ?
                <TouchableOpacity
                    onPress={ () => deleteItem()}
                    style={{ top : -45, left : 180 }}
                    >
                    <Ionicons name="ios-trash" size={32} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={ () => props.navigation.navigate('AddForm')}
                    style={{ top : -45, left : 180 }}
                    >
                    <Ionicons name="ios-add-circle-outline" size={32} />
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});