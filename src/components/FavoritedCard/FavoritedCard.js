import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import styles from "./FavoritedCard.style";


const FavoritedCard = ({volumeInfo, id, handleCard, handleDelete}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleCard}>
                <View style={styles.image_container} >
                    {volumeInfo.imageLinks != undefined ? <Image style={styles.image}source={{uri: volumeInfo.imageLinks.thumbnail}}/>
                    : <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/3160075/pexels-photo-3160075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} />
                    }
                </View>
                <View style={styles.info_container}>
                    <Text style={styles.title}>{volumeInfo.title}</Text>
                    <Text style={styles.author}>{volumeInfo.authors[0]}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.icon_container}>
                <FontAwesome onPress={() => handleDelete(id)} name='backspace'  size={16} color='orange' />
            </View>
        </View>
      
    )
}

export default FavoritedCard