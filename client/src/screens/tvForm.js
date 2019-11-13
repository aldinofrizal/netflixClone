import React, { useState, useEffect } from 'react'
import Header from '../component/header'
import { Alert, Text, View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Makiko } from 'react-native-textinput-effects';
import AwesomeButton from 'react-native-really-awesome-button'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const MUTATION_ADD_TVSERIE = gql`
    mutation ($title:String, $overview:String, $poster_path:String, $popularity:Int) {
        addTvSerie (title: $title, overview: $overview, poster_path : $poster_path, popularity : $popularity) {
            title, overview, poster_path, popularity
        }
    }
`

export default AddForm = (props) => {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState('')
    const [poster_path, setPosterPath] = useState('')
    const [addTvSerie, { loading, data, error }] = useMutation(
        MUTATION_ADD_TVSERIE,
    )

    const submitForm = () => {
        //validation
        //submit
        addTvSerie({
            variables: {
              title,
              overview,
              poster_path,
              popularity : Number(popularity),
            }
        })
        props.navigation.navigate('Home')
    }

    return (
        <>
            <Header {...props} />
            <View style={{ flex: .85, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text>Add Tv Series</Text>
                <Makiko
                    onChangeText={text => setTitle(text)}
                    label={'Title'}
                    iconClass={FontAwesome}
                    iconName={'heart'}
                    iconColor={'white'}
                    inputPadding={12}
                    inputStyle={{ color: 'black', width: 400, fontWeight: "bold" }}
                    style={styles.input}
                />
                <Makiko
                    onChangeText={text => setOverview(text)}
                    label={'Overview'}
                    iconClass={FontAwesome}
                    iconName={'video-camera'}
                    iconColor={'white'}
                    inputPadding={12}
                    inputStyle={{ color: 'black', width: 400, fontWeight: 'bold' }}
                    style={styles.input}
                />
                <Makiko
                    onChangeText={text => setPopularity(text)}
                    label={'Popularity'}
                    iconClass={FontAwesome}
                    iconName={'cloud'}
                    iconColor={'white'}
                    inputPadding={12}
                    inputStyle={{ color: 'black', width: 400, fontWeight: 'bold' }}
                    style={styles.input}
                />
                <Makiko
                    onChangeText={text => setPosterPath(text)}
                    label={'Poster Path'}
                    iconClass={FontAwesome}
                    iconName={'cloud'}
                    iconColor={'white'}
                    inputPadding={12}
                    inputStyle={{ color: 'black', width: 400, fontWeight: 'bold' }}
                    style={styles.input}
                />
                <AwesomeButton
                    onPress={() => submitForm()}
                    type="secondary" backgroundColor="#ED1B34" backgroundDarker="red" borderColor="black"
                    style={{ marginVertical: 10 }}
                >
                    <Text style={{ paddingHorizontal: 25, fontWeight: 'bold', fontSize: 14, color: 'white' }}>Add Tv Series</Text>
                </AwesomeButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        backgroundColor: 'red',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
        marginVertical: 10
    }
})