import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList,ScrollView, ImageBackground,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import styles from "./Profile.style";
import FavoritedCard from "../../../components/FavoritedCard";
import EditProfile from "../../../components/Modals/EditProfile";


const Profile = ({navigation}) => {

    const [favorited, setFavorited] = useState([]);
    const [readed, setReaded] = useState([]);

    const [photos, setPhotos] = useState();
    const [editModalVisible, setEditModalVisible] = useState(false);
   
    const [userInfo, setUserInfo] = useState('');
    const [scrollBar, setScrollBar] = useState({
        currentPage: 1,
    });

    useEffect(() => {
      const user = auth().currentUser;
      const userId = user.uid;
      database().ref(`users/${userId}/favorited`).on('value', snapshot => {
          const data = snapshot.val();
          const favoriteBooks = [];
          for (const key in data) {
            favoriteBooks.push({
              ...data[key].book,
              id: key,
            });
          }
          setFavorited(favoriteBooks);
        });
    }, []);

    useEffect(() => {
      const user = auth().currentUser;
      const userId = user.uid;
      database().ref(`users/${userId}/readed`).on('value', snapshot => {
          const data = snapshot.val();
          const readedBooks = [];
          for (const key in data) {
            readedBooks.push({
              ...data[key].book,
              id: key,
            });
          }
          setReaded(readedBooks);
        });
    }, []);

    useEffect(() => {
        const user = auth().currentUser;
        const userId = user.uid;
        const onProfileUpdate = database().ref(`users/${userId}/profile`).on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
              setUserInfo(data);
            }
          });
          return () =>
          database().ref(`users/${userId}/profile`).off('value', onProfileUpdate);
      }, []);
    
    useEffect(() => {
        const user = auth().currentUser;
        const userId = user.uid;
        database().ref(`users/${userId}/photos`).on('value', snapshot => {
          setPhotos(snapshot.val());
        });
    }, []);

      const handleDeleteFav = async id => {
        const user = auth().currentUser;
        const userId = user.uid;
        await database().ref(`users/${userId}/favorited/${id}`).remove();
      };
    
      const handleDeleteReaded = async id => {
        const user = auth().currentUser;
        const userId = user.uid;
        await database().ref(`users/${userId}/readed/${id}`).remove();
      };

      const editProfileModal = () => {
        setEditModalVisible(true);
      };
      const handleEditModalClose = () => {
        setEditModalVisible(false);
      };

      const handleSignOut = async () => {
        try {
            const currentUser = auth().currentUser
            if (currentUser) {
                await auth().signOut();
                navigation.navigate('LoginPage')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderReadCard = ({item}) => (
      <FavoritedCard 
        volumeInfo = {item.volumeInfo}
        id={item.id}
        handleDelete={handleDeleteReaded}
        handleCard={() => handleBooks(item)}
      />
    )

    const renderFavCard = ({item}) => (
      <FavoritedCard 
        volumeInfo = {item.volumeInfo}
        id={item.id}
        handleDelete={handleDeleteFav}
        handleCard={() => handleBooks(item)}
      />
    )

    const handleBooks = item => {
      navigation.navigate ('BookDetail', {item})
    }

    const switchPage = page => {
      setScrollBar({
        currentPage: page,
      });
    };
  
    return (
        <View style={styles.container}>
          <View style={styles.image_container}>
            {photos && photos.banner ? (
              <Image style={styles.background} source={{uri: photos.banner}} />
            ) : (
              <ImageBackground
                style={styles.background}
                source={require('../../../assets/images/UserBackground.png')}
              />
            )}
            {photos && photos.profile ? (
              <Image style={styles.profile_image} source={{uri: photos.profile}} />
            ) : (
            <Image
              style={styles.profile_image}
              source={require('../../../assets/images/UserProfile.png')}
            />
           )}
           <Icon
                style={styles.logout}
                name="logout"
                size={25}
                color='white'
                onPress={handleSignOut}
              />
          </View>
          <View style={styles.info_container}>
            <View style={styles.user_container}>
              {userInfo.name ? (
                <Text style={styles.username}>{userInfo.name} </Text>
              ) : (
                <Text style={styles.username}>Name</Text>
              )}
              {userInfo.job ? (
                <Text style={styles.job}>{userInfo.job}</Text>
              ) : (
                <Text style={styles.job}>Job</Text>
              )}
            </View>
            <View style={styles.edit_container}>
              <TouchableOpacity
                onPress={editProfileModal}
                style={styles.edit_button}>
                <FontAwesome name='edit' size={18} />
              </TouchableOpacity>
              <EditProfile
                isVisible={editModalVisible}
                onClose={handleEditModalClose}
              />
            </View>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => switchPage(1)}
            style={
              scrollBar.currentPage === 1
                ? styles.menu_title_selected
                : styles.menu_title
            }>
            <Text style={styles.menu_title}>Readed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => switchPage(2)}
            style={
              scrollBar.currentPage === 2
                ? styles.menu_title_selected
                : styles.menu_title
            }>
            <Text style={styles.menu_title}>Favorites</Text>
          </TouchableOpacity>
      </View>
        <ScrollView horizontal={true}>
          <View >
          {scrollBar.currentPage === 1 ? (
            <FlatList
               data={readed}
               keyExtractor={item => item.id}
               renderItem={renderReadCard}
            />
          ) : (
            <FlatList
               data={favorited}
               keyExtractor={item => item.id}
               renderItem={renderFavCard}
            />
            )}
          </View>
        </ScrollView>

        </View>
    )
}

export default Profile