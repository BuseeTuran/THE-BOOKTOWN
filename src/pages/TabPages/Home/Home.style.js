import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        margin: 3,
        
        
    },
    input_container: {
        flexDirection: "row",
        borderRadius: 15,
        borderWidth: 0.5,
        justifyContent: 'space-between',
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 5,
        marginBottom: 15,
        borderColor: 'orange',
        marginVertical: 3,
        
    },
    input: {
        fontSize: 15,
        padding: 8,
        
    },
    icon: {
        marginHorizontal: 8,
        marginVertical: 15
    },
    title: {
        margin: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        
    },
    book_container: {
        backgroundColor: '#E6E6E6',
        padding: 5
    }
})