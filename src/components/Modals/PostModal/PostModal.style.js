import { StyleSheet, Dimensions } from "react-native";

const deviceSize = Dimensions.get('window')

export default StyleSheet.create ({
    container: {
        backgroundColor: 'white',
        height: deviceSize.height / 1.6,
        borderRadius: 10,
    },
    share_button: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#E6E6E6',
        marginHorizontal: 100,
        alignItems: 'center',
        left: 100

    },
    share_text: {
        fontWeight: '500',
        fontSize: 16
    },
    input: {
        flex: 8,
        padding: 10,
        borderWidth: 1
    },
    share_photo: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginLeft: 73,
        marginTop: 50
    },
    icon_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        
    }

})