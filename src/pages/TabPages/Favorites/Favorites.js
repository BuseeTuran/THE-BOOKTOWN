import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import styles from "./Favorites.style";
import FavoritedCard from "../../../components/FavoritedCard";



const Favorites = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [favoritedList, setFavoritedList] = useState([]);
   

    useEffect(() => {
        //It pulls the books that the user has added to favorites from the database and adds to the favorites state.
        const user = auth().currentUser;
        const userId = user.uid;
        database()
          .ref(`users/${userId}/favorited`)
          .on('value', snapshot => {
            const data = snapshot.val();
            const favoriteBooks = [];
            for (const key in data) {
              favoriteBooks.push({
                ...data[key].book,
                id: key,
              });
              setLoading(false);
            }
            setFavoritedList(favoriteBooks);
          });
      }, []);


   
    const handleDeleteFav = async id => {
        const user = auth().currentUser;
        const userId = user.uid;
         database().ref(`users/${userId}/favorited/${id}`).remove();
    };



    const handleBook = item => {
        navigation.navigate('BookDetail', {item})
    }

    const renderFav = ({item}) => 
      (<FavoritedCard 
        volumeInfo={item.volumeInfo} 
        id={item.id} 
        handleCard={() => handleBook(item)} 
        handleDelete={handleDeleteFav} 
      />)

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Books 📙</Text>
              {loading ? (
                <ActivityIndicator/>
              ) : favoritedList.length === 0 ? (
                <Text style={styles.text}>You haven't added to your favorites list yet.</Text>
              ) : (
                  <FlatList
                    data={favoritedList} 
                    renderItem={renderFav}
                    keyExtractor={item => item.id}
                  />
                )}
        </View>
        
    )
  
}

export default Favorites