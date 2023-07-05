import { StyleSheet, Dimensions } from "react-native";

const deviceSize = Dimensions.get('window')

export default StyleSheet.create ({
    container: {
        flex: 1,
        margin: 3,
        width: 115,
        height: 200,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#E6E6E6',
        borderRadius: 5,
        borderColor: '#B3B3B3',
        
    },
    image: {
        width: deviceSize.width/3.5,
        height: deviceSize.height/4.5,
    },
    title: {
        padding:1,
        flex: 1,
        width: '110%',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        top: 3,
        color: '#333333'
    }
})
