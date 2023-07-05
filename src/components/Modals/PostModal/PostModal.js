import React, {useState} from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import styles from "./PostModal.style";


const PostModal = ({isVisible, onClose}) => {

    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);

    const addPhoto = () => {
        const options = {
            title: 'Titlee',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                return;
            }
            if (response.errorCode) {
                showMessage ({
                    message: 'Error',
                    type: 'warning'
                })
                return;
            } else {
                const path = response.assets[0].uri;
                setPhoto(path);
            }
        })
    }


    const onShare = async () => {
        const userId = auth().currentUser.uid;
        database().ref(`users/${userId}/shared`).push({
            text: text,
            photo: photo,
            date: new Date().toISOString(),
        })
        setPhoto(null);
        setText('');
        onClose();
    };

    return (
        <Modal
         isVisible={isVisible}
         onBackButtonPress={onClose}
         onBackdropPress={onClose}
         onSwipeComplete={onClose}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={onShare} style={styles.share_button}>
                    <Text style={styles.share_text}>Share</Text>
                </TouchableOpacity>
                <View style={styles.input}>
                    <TextInput
                        placeholder="What do you think?" 
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    {photo ? (
                        <Image style={styles.share_photo} source={{uri: photo}} />
                    ) : null}
                </View>
                <View style={styles.icon_container}>
                    <TouchableOpacity onPress={addPhoto}>
                        <FontAwesome  name='image' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='file-gif-box' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default PostModal