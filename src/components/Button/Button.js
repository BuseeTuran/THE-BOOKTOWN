import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./Button.style";


const Button = ({onPress, text, theme='primary'}) => {
    return (
        <TouchableOpacity style={styles[theme].container} onPress={onPress}>
            <View style={styles[theme].button_container}>
                <Text style={styles[theme].title}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button
