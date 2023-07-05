import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import  AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./BookDetail.style";


const BookDetail = ({route}) => {

    const {item} = route.params;
  
        
    const addReaded = () => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            database().ref(`users/${userId}/readed`).once('value').then(snapshot => {
                const data = snapshot.val();
                let isExists = false;
                for (const key in data) {
                    if(data[key].book.id === item.id) {
                        isExists = true;
                        break;
                    }
                }
                if (isExists) {
                    showMessage({
                      message: 'Failed! This book is already in your readed!',
                      type: 'danger',
                    });
                  } else {
                    database().ref(`users/${userId}/readed`).push({
                      book: item,
                    });
                    showMessage({
                      message: 'The book has been added readed successfully!',
                      type: 'success',
                    });
                  }
            })
        }
    };

    const addFavorited = () => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            database().ref(`users/${userId}/favorited`).once('value').then(snapshot => {
                const data = snapshot.val();
                let isExists = false;
                for (const key in data) {
                    if(data[key].book.id === item.id) {
                        isExists = true;
                        break;
                    }
                }
                if (isExists) {
                    showMessage({
                      message: 'Failed! This book is already in your favorited!',
                      type: 'danger',
                    });
                } else {
                    database().ref(`users/${userId}/favorited`).push({
                      book: item,
                    });
                    showMessage({
                      message: 'The book has been added favorited successfully!',
                      type: 'success',
                    });
                } 
            })
        }
    }
   
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.upper_container}>
                {item.volumeInfo.imageLinks !== undefined ? (
                    <Image style={styles.image} source={{uri: item.volumeInfo.imageLinks.thumbnail}} />
                ): (
                    <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/3160075/pexels-photo-3160075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}/>
                )}
                <View style={styles.info_container}>
                    <Text style={styles.title}>{item.volumeInfo.title}</Text>
                    <View style={styles.authors_container}>
                        <Text style={styles.authors}>Authors: {item.volumeInfo.authors}</Text>
                    </View>
                    <View style={styles.page_container}>
                        <Text style={styles.pageCount}>Page Count: {item.volumeInfo.pageCount} </Text>
                    </View>
                    <View style={styles.category_container}>
                        <Text style={styles.categories}>Categories: {item.volumeInfo.categories}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.icon_container}>
                <TouchableOpacity style={styles.icon} onPress={() => addReaded()}>
                    <FontAwesome  name="bookmark" size={24} color='black'  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon1} onPress={() => addFavorited()}>
                    <FontAwesome  name="heart" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.description_container}>
                <Text style={styles.description_title}>Description</Text>
                {item.volumeInfo.description !== undefined ? (
                    <Text style={styles.description}>{item.volumeInfo.description}</Text>
                ) : (
                    <Text style={styles.description}>There is no book description.</Text>
                )}
            </View>
        </ScrollView>
    )
}

export default BookDetail