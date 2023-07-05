import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Image, StatusBar } from "react-native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import styles from "./Sociability.style";
import PostCard from "../../../components/PostCard/PostCard";
import FloatingButton from "../../../components/FloatingButton/FloatingButton";
import PostModal from "../../../components/Modals/PostModal/PostModal";


const Sociability = () => {

    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    

    useEffect (() => {
        const user = auth().currentUser;
        const userId = user.uid;
        database().ref(`users/${userId}/photos`).on('value', snapshot => {
            setPhotos(snapshot.val())
        })
        setLoading(false)
    }, []);

    const handleModal = () => {
        setModalVisible(true)
    };

    const handleModalClose = () => {
        setModalVisible(false)
    };

    return (
        <View style={styles.container}>
            <StatusBar  backgroundColor={'#F2F2F2'} barStyle='dark-content' />
            <View style={styles.top_container}>
                {photos && photos.profile ? (
                    <Image style={styles.top_image} source={{uri: photos.profile}} />
                ) : (
                    <Image style={styles.top_image} source={require('../../../assets/images/UserProfile.png')} />
                )}
                <View style={styles.article_container}>
                    <Image style={styles.article} source={require('../../../assets/logo/article.png')}/>
                </View>
                <View>
                    { loading ? <ActivityIndicator size="large"/> : <PostCard/> }
                </View>
            </View>
            <FloatingButton onPress={handleModal} icon="pencil-alt"/>
            <PostModal isVisible={modalVisible} onClose={handleModalClose} />
        </View>
    )
}

export default Sociability