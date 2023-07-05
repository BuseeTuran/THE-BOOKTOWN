import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        padding: 20,
        
    },
    logo_container: {
        flex: 1,
        padding: 25,
        marginBottom: 10
        
    },
    logo: {
        width: deviceSize.width/1.2,
        height: deviceSize.height/2.2,
        alignSelf: 'center',
    }
})