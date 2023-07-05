import { StyleSheet } from "react-native";


const base_style = StyleSheet.create ({
    container: {
        margin: 5,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 40,
        bottom: 10
        
        
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,


    },
})

export default {
    primary: StyleSheet.create ({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: '#FAFAFA',
            borderWidth: 1,
            borderColor: '#333333'
        },
        button_container: {
            ...base_style.button_container,

        },
        title: {
            ...base_style.title,
            color: '#333333'
        }
    }),
    secondary: StyleSheet.create ({
        ...base_style,
        container: {
            ...base_style.container,
            backgroundColor: '#CCCCCC',
            borderWidth: 1,
            borderColor: '#333333'
        },
        button_container: {
            ...base_style.button_container,

        },
        title: {
            ...base_style.title,
            color: '#333333'
        }
    }),

}

