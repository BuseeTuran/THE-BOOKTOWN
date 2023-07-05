import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./UserProfileCard.style";

const UserProfileCard = ({onPress, volumeInfo, book}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.card_container}>
                    {volumeInfo && volumeInfo.imageLinks ? (
                        <Image style={styles.image} source={{uri: volumeInfo.imageLinks.thumbnail}} />
                    ) : (
                        <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/3160075/pexels-photo-3160075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} />
                    )}
                    <View style={styles.info_container}>
                        <Text style={styles.title}>{book.title}</Text>
                        <Text style={styles.author}>{book.authors[0]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfileCard