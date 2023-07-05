import React, {useState} from "react";
import { View, Text, TextInput  } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Input.style";


const Input = ({placeholder, value, onType, isSecure=false, primaryIcon=null, secondaryIcon=null, changeableIcon=false}) => {

    const [secure, setSecure] = useState(isSecure)
    const [icon, setIcon] = useState(primaryIcon)

    const changeIcon = () => {
        if (changeableIcon) 
            if (icon === primaryIcon) {
                setSecure(false)
                setIcon(secondaryIcon)
            } else {
                setSecure(true)
                setIcon(primaryIcon)
            }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input} 
                placeholder={placeholder}
                value={value}
                onChangeText={onType}
                secureTextEntry={secure}
                autoCapitalize="none"
                placeholderTextColor='#333333'
            />
            <Icon style={styles.icon} name={icon} onPress={changeIcon} />
        </View>
    )
}

export default Input
