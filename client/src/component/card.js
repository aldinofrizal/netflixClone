import React from 'React'
import { View, Image, StyleSheet, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default SwipeMovie = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={ () => props.navigation.navigate('Detail' , { item : props.item.item }) }
            >
            <View style={styles.card}>
                <Image
                    source={{ uri: props.item.item.poster_path }}
                    style={styles.image}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image : {
        height: 200, 
        width: 150, 
        resizeMode: 'contain', 
        borderRadius: 15,
    }
})