import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground, ScrollView } from "react-native";
import database from "@react-native-firebase/database";

import styles from "./UserProfile.style";
import UserProfileCard from "../../components/UserProfileCard";

const UserProfile = ({route, navigation}) => {

    const {userId} = route.params;

    const [favoriteBook, setFavoriteBook] = useState([]);
    const [readBook, setReadBook] = useState([]);

    const [user, setUser] = useState(null);
    const [scrollBar, setScrollBar] = useState({
        currentPage: 1,
    });


    const switchPage = page => {
        setScrollBar({
          currentPage: page,
        });
      };

    useEffect (() => {
        const userRef = database().ref(`users/${userId}`);
        userRef.on('value', snapshot => {
            setUser(snapshot.val());

            if (snapshot.val() && snapshot.val().favorited) {
                const favoriteBookData = snapshot.val().favorited;
                const favoriteBookArray = Object.keys(favoriteBookData).map(
                    bookId => ({
                        id: bookId,
                        volumeInfo: favoriteBookData[bookId].book.volumeInfo,
                        title: favoriteBookData[bookId].book.volumeInfo.title,
                        authors: favoriteBookData[bookId].book.volumeInfo.authors,
                        thumbnail: favoriteBookData[bookId].book.volumeInfo.imageLinks.thumbnail,
                    })
                )
                setFavoriteBook(favoriteBookArray);
            } 

            if (snapshot.val() && snapshot.val().readed) {
                const readBookData = snapshot.val().readed;
                const readBookArray = Object.keys(readBookData).map(
                    bookId => ({
                        id: bookId,
                        volumeInfo: readBookData[bookId].book.volumeInfo,
                        title: readBookData[bookId].book.volumeInfo.title,
                        authors: readBookData[bookId].book.volumeInfo.authors,
                        thumbnail: readBookData[bookId].book.volumeInfo.imageLinks.thumbnail,
                    })
                )
                setReadBook(readBookArray);
            } 
        })
        return ;
    }, [userId]);

    const renderFavCard = ({item}) => (
        <UserProfileCard
          key={item.id}
          book={item}
          volumeInfo={item.volumeInfo}
          onPress={() => handleBook(item)}
        />
      );
    
    const renderReadCard = ({item}) => (
        <UserProfileCard
          key={item.id}
          book={item}
          volumeInfo={item.volumeInfo}
          onPress={() => handleBook(item)}
        />
    );

    const handleBook = item => {
        navigation.navigate('BookDetail', {item})
    };


    return (
        <View style={styles.container}>
            <View style={styles.image_container}>
                {user && user.photos && user.photos.banner ? (
                    <ImageBackground style={styles.background} source={{uri: user.photos.banner}} />
                ) : (
                    <ImageBackground style={styles.background} source={require('../../assets/images/UserBackground.png')}/>
                )}
                {user && user.photos && user.photos.profile ? (
                    <Image style={styles.profile_image} source={{uri: user.photos.profile}}/>
                ) : (
                    <Image style={styles.profile_image} source={require('../../assets/images/UserProfile.png')}/>
                )}
            </View>
            <View style={styles.info_container}>
                <View style={styles.user_container}>
                    <Text style={styles.username}>{user?.profile?.name}</Text>
                    <Text style={styles.job}>{user?.profile?.job}</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => switchPage(1)} 
                    style={scrollBar.currentPage === 1 ? styles.menu_title_selected : styles.menu_title}>
                        <Text style={styles.title}>Readed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchPage(2)} 
                    style={scrollBar.currentPage === 2 ? styles.menu_title_selected : styles.menu_title}>
                        <Text style={styles.title}>Favorites</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                <View>
                    {scrollBar.currentPage === 1 ? (
                        <FlatList
                        data={readBook}
                        keyExtractor={item => item.id}
                        renderItem={renderReadCard}
                        />
                    ) : (
                        <FlatList
                        data={favoriteBook}
                        keyExtractor={item => item.id}
                        renderItem={renderFavCard}
                        />
                        )}
                </View>

            </ScrollView>
        </View>
    )
}

export default UserProfile