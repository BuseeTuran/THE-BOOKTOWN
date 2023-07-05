import React, {useState, useEffect} from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

import styles from "./EditProfile.style";


const EditProfile = ({isVisible, onClose, userId}) => {

    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect (() => {
        const user = auth().currentUser;
        const userId = user.uid;
        database().ref(`users/${userId}/photos`).on('value', snapshot => {
            setPhotos(snapshot.val());
        })
    }, []);

    const addProfilePhoto = () => {
        const user = auth().currentUser;
        const userId = user.uid;
        const options = {
            title: 'Titlee',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary (options, response => {
            if (response.didCancel) {
                showMessage ({
                    message: 'Something went wrong.',
                    type: 'warning'
                });
            } else if (response.errorCode) {
                showMessage ({
                    message: 'Something went wrong.',
                    type: 'warning'
                });
            } else {
                const path = response.assets[0].uri;
                database().ref(`users/${userId}/photos/profile`).set(path);
            }
        })

    };

    const addBannerPhoto = () => {
        const user = auth().currentUser;
        const userId = user.uid;
        const options = {
            title: 'Titlee',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary (options, response => {
            if (response.didCancel) {
                showMessage ({
                    message: 'Something went wrong.',
                    type: 'warning'
                });
            } else if (response.errorCode) {
                showMessage ({
                    message: 'Something went wrong.',
                    type: 'warning'
                });
            } else {
                const path = response.assets[0].uri;
                database().ref(`users/${userId}/photos/banner`).set(path);
            }
        })

    };

    const onSend = () => {
        const user = auth().currentUser;
        const userId = user.uid;
        database().ref(`users/${userId}/profile`).set({name: name, job: job}).then(() => {
            showMessage ({
                message: 'Changes saved!',
                type: 'success',
            })
        })
        onClose();
    }




    return (
        <Modal
            isVisible={isVisible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <View style={styles.photo_container}>
                    <TouchableOpacity onPress={addProfilePhoto}>
                        {photos && photos.profile ? (
                            <Image style={styles.profile_photo} source={{uri: photos.profile}} />
                        ) : (
                            <Image style={styles.profile_photo} source={require('../../../assets/images/UserProfile.png')} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addBannerPhoto}>
                        {photos && photos.banner ? (
                            <Image style={styles.banner_photo} source={{uri: photos.banner}} />
                        ) : (
                            <Image style={styles.banner_photo} source={require('../../../assets/images/UserBackground.png')} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.name_container}>
                    <Text style={styles.name}>Full Name :</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Please enter your full name.."
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.job_container}>
                    <Text style={styles.job}>Job : </Text>
                    <TextInput
                        style={styles.input} 
                        placeholder="Please enter your job.."
                        onChangeText={setJob}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={onSend}>
                            <Text style={styles.button_text}>Save</Text>
                </TouchableOpacity>

            </View>

        </Modal>
    )
}

export default EditProfile