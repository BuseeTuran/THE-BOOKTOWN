import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import styles from "./FloatingButton.style";

const FloatingButton = ({onPress, icon}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <FontAwesome name={icon} color='white' size={20} />
        </TouchableOpacity>
    )
}

export default FloatingButton