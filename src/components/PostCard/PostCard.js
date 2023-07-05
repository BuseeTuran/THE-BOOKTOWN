import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import database from "@react-native-firebase/database";
import { parseISO, compareDesc, formatDistanceToNow } from "date-fns";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import styles from "./PostCard.style";


const PostCard = () => {

    const [posts, setPosts] = useState([]);

    useEffect (() => {
        database().ref('users/').on('value', snapshot => {
            const usersData = snapshot.val();
            const posts = [];

            for (const userId in usersData) {
                const user = usersData[userId]

                if (user.shared && user.photos) {
                    for (const postId in user.shared) {
                        const post = user.shared[postId]
                        post.name = user.profile.name
                        post.profile = {photo: user.photos.profile};
                        post.userId = userId
                        post.likes = post.likes ?? 0;
                        post.isLiked = false;
                        post.id = postId
                        posts.push(post);
                    }
                }
            }
            const sortedPosts = posts.sort((a,b) => {
                if (a.date === b.date) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }
                return compareDesc(new Date (a.date), new Date (b.date))
            })
            setPosts (sortedPosts);
        })
    }, []);

    const handleLike = post => {
        const updatedPosts = posts.map (p => {
            if (p.id === post.id) {
                return {
                    ...p,
                    likes: p.likes + 1,
                    isLiked: true,
                }
            }
            return p;
        });
        setPosts (updatedPosts)
        database().ref(`users/${post.userId}/shared/${post.id}/likes`).set(post.likes + 1)
    }

    const navigation = useNavigation();
    
    const handleUser = userId => {
        navigation.navigate('UserProfile', {userId: userId})
    }



    return (
        <ScrollView style={styles.scroll}>
            {posts.map(post => (
                <View style={styles.container} key={post.text}>
                    <View style={styles.top_container}>
                        <View style={styles.top_info}>
                            <TouchableOpacity onPress={() => handleUser(post.userId)}>
                                {post.profile.photo ? (
                                    <Image style={styles.profile_image} source={{uri: post.profile.photo}} />
                                ) : (
                                    <Image style={styles.profile_image} source={require('../../assets/images/UserProfile.png')} />
                                )}
                            </TouchableOpacity>
                            <View style={styles.user_info}>
                                <Text style={styles.username}>{post.name}</Text>
                                <Text style={styles.date}>{formatDistanceToNow(parseISO(post.date), {addSuffix: true})}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.postmessage}>{post.text}</Text>
                    <View style={styles.post_image}>
                        {post.photo && (
                            <Image style={styles.shared_image} source={{uri: post.photo}} />
                        )}
                    </View>
                    <TouchableOpacity style={styles.like} onPress={() => handleLike(post)}>
                            <FontAwesome name='thumbs-up' style={styles.icon} size={20} color={post.isLiked ? 'blue' : 'black'} />
                            <Text style={styles.likes}>{post.likes}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}

export default PostCard