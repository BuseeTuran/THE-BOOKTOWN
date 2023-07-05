import { StyleSheet, Dimensions } from "react-native";

deviceSize = Dimensions.get("window")

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        padding: 20,
        
    },
    logo_container: {
        flex: 1,
        padding: 25,
        marginBottom: 30
        
    },
    logo: {
        width: deviceSize.width/1,
        height: deviceSize.height/2,
        alignSelf: 'center',
    }
})