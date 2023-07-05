import { StyleSheet, Platform } from "react-native";


export default StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        bottom: 40,
        

    },
    input: {
        flex: 1,
        padding: Platform.OS === 'android' ? 8 : 15,
        fontSize: 15,
        borderRadius: 10 ,
        marginVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,

    },
    icon: {
        fontSize: 18,
        right: 15,
        marginTop: 25,
        position: 'absolute',
        color: '#333333'
    }
})