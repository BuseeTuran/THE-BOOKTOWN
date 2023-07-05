import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TabBarIcon = ({iconName, focused}) => {
    return (
        <View>
            <Icon name={iconName} size={25} color={focused ? 'orange' : '#333333'} /> 
        </View>
    )
}

export default TabBarIcon