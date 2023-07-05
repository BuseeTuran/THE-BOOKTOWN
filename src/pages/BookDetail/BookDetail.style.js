import { StyleSheet } from "react-native";


export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    upper_container: {
        backgroundColor: '#E6E6E6',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        margin: 8,
        padding: 8
    },
    image: {
        width: 150,
        height: 220,
        borderRadius: 10,
        marginVertical: 10
    },
    info_container: {
        flex: 1,
        marginVertical: 25,
        marginHorizontal: 10,

    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        bottom: 10,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderColor: '#808080',
        color: '#808080'
    },
    authors_container: {
        padding: 3,
        
    },
    authors: {
        fontSize: 14,
    },
    page_container: {
        padding: 3,

    },
    pageCount: {
        fontSize: 14,
    },
    category_container: {
        padding: 3,

    },
    categories: {
        fontSize: 14,
    },
    icon_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        marginHorizontal: 10
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 2,
        padding: 5,
        
    },
    icon1: {
        flex: 1,
        alignItems:'center',
        padding: 5
    },
    description_container: {
        padding: 5,
        
        margin: 5
    },
    description_title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    description: {
        textAlign: 'left',
        fontSize: 14
    }
})