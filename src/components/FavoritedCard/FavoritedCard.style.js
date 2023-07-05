import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container:{
      margin: 4,
      backgroundColor: 'white',
      height: 110,
      borderRadius: 5,
      elevation: 5,
      width: 350
        
    },
    image_container: {
       marginTop: 5,
       marginLeft: 4
    },
    image:{
        width: 70,
        height: 100,
        borderRadius: 5
        
    },
    title:{
        fontSize: 15,
        bottom: 80,
        fontWeight: '700',
        color: '#4D3200',
    },
    author: {
       bottom: 70,
       fontSize: 13,
       color: '#4D3200'
        
    },
    info_container: {
       left: 90,
       width: 180
        
      
    },
    icon_container:{
        
        position: 'absolute',
        bottom: 80,
        alignSelf: 'flex-end',
        right: 10
        
    
        
        
        
        
        
    }
})