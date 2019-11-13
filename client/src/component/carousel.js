import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width: screenWidth, height } = Dimensions.get('window')

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

export default Movies = (props) => {
    const { loading, error, data } = useQuery(QUERY_TVSERIES)
    
    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity
                onPress={ () => props.navigation.navigate('Detail' , { item }) }
            >
                <View style={styles.item}>
                    <ParallaxImage
                        source={{ uri: item.poster_path }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return (
            <Text>loading</Text>
        )
    } else {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems : 'center'  }}>
                <TouchableOpacity
                    onPress={() => console.log('hello')} 
                    >
                    <Text style={{ marginBottom : 15, fontWeight : "bold" , fontSize : 26, color : 'red' }}>POPULAR TV SERIES</Text>
                </TouchableOpacity>
                <Carousel
                    style={{ flex: 1, justifyContent: "center", alignItems: 'center', padding: 0 }}
                    sliderWidth={screenWidth}
                    sliderHeight={20}
                    itemWidth={screenWidth - 60}
                    data={data.tvSeries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 30,
        height: screenWidth - 5,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 35,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
        borderRadius: 15,
    },
})