import React from 'react'
import { View , Text, Image } from 'react-native'

export default DetailContent = (props) => {
    const {title , overview, poster_path} = props.item

    return (
        <>
            <View style={{ flex : 1, justifyContent : "center" , alignItems : 'center', paddingHorizontal : 10, paddingVertical : 20 }}>
                <Image 
                    source={{ uri : poster_path}}
                    style={{ width : 200, height: 200, resizeMode : 'contain', marginVertical : 10}}
                />
                <Text style={{ fontWeight : 'bold', fontSize : 32 }}>{title}</Text>
                <Text style={{ paddingHorizontal : 20 }}>{overview}</Text>
            </View>
        </>
    )
}