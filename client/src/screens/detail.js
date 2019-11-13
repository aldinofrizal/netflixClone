import React from 'react';
import Modal from 'react-native-modalbox';
import Header from '../component/header'
import AwesomeButton from 'react-native-really-awesome-button'
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Dimensions,
} from 'react-native';
import DetailContent from '../component/detailContent'
const screen = Dimensions.get('window')

export default class App extends React.Component {
    constructor(){
        super()
        this.state = {
            isOpen : false
        }
    }

    render() {
        const item = this.props.navigation.state.params.item
        return (
            <>
                <Header {...this.props}/>
                <View style={{ flex: .9, justifyContent: 'flex-end', alignItems: 'center', top: 125 }}>
                    <Image
                        source={{ uri: item.poster_path }}
                        style={{ height: 800, width: 400, resizeMode: 'cover', borderRadius: 20, zIndex : -1000 }}
                    />
                    <AwesomeButton
                        onPress={() => this.refs.detail.open()}
                        type="secondary" style={{ top: -150 }} backgroundColor="red" backgroundDarker="grey" borderColor="red">
                        <Text style={{ paddingHorizontal: 25, fontWeight: 'bold', fontSize: 14, color: 'white' }}>See {item.title} Detail</Text>
                    </AwesomeButton>

                    <Modal style={styles.modal} position={"bottom"} ref={'detail'} swipeArea={50} coverScreen={true}>
                        <ScrollView>
                            <View style={{ width: screen.width, paddingLeft: 10 }}>
                                <DetailContent item={item} />
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            </>
        )

    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
        zIndex : 1000,
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});

