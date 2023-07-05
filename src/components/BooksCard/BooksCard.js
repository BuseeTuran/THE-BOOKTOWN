import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import styles from "./BooksCard.style";


const BooksCard = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onSelect}>
            <View style={styles.container}>
                {props.volumeInfo.imageLinks !== undefined ? (
                <Image style={styles.image} source={{uri: props.volumeInfo.imageLinks.thumbnail}}  />
                ) : (
                    <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/3160075/pexels-photo-3160075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                    
                  />
                )}
                <Text style={styles.title}>{props.volumeInfo.title} </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BooksCard