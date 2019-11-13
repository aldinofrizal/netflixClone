import React from 'react'
import { View } from 'react-native'
import Carousel from '../component/carousel'
import Header from '../component/header'
import Swipe from '../component/swipe'

export default Home = (props) => {
    
    return (
        <>
        <Header {...props}/>
        <View 
            style={{ flex: 1, marginTop : -40 }}
            >
            <Carousel {...props}/>
            <Swipe {...props} />
        </View>
        </>
    )
}