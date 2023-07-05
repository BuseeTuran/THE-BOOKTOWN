import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
      },
      image_container: {
    
      },
      background: {
        width: deviceSize.width / 1,
        height: deviceSize.height / 4,
      },
      profile_image: {
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 60,
        position: 'absolute',
        marginTop: 100,
        marginLeft: 15,
      },
      info_container: {
        height: deviceSize.height/5,
      
      },
      user_container: {
        left: 12,
        top: 50,
        
      },
      username: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 5
    
      },
      job: {
        fontSize: 15,
        color: 'black',
      },
      menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
      },
      menu_title: {
        fontSize: 17,
        color: '#332100',
        fontWeight: '400',
      },
      menu_title_selected: {
        borderBottomWidth: 2,
        color: '#332100',
      }
})