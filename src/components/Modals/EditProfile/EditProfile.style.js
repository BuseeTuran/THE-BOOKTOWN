import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        padding: 10,
        borderRadius: 10,
        height: 370,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 5,
    },
    photo_container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 50,
    },
    profile_photo: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    banner_photo: {
        width: 160,
        height: 90,
        borderRadius: 10,
    },
    name_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        paddingRight: 5,
    },
    input: {
       padding: 7
    },
    job_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingLeft: 15,
    },
    job: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        paddingRight: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 7,
        marginHorizontal: 60,
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})