import React, {useState} from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import auth from "@react-native-firebase/auth";

import styles from "./Login.style";
import colors from "../../../styles/colors";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import authErrorMessage  from "../../../utils/authErrorMessage";


const initialFormValues = {
    usermail: '',
    password: '',
}


const Login = ({navigation}) => {

    function handleSignUp () {
        navigation.navigate('SignPage')
    }

    const [loading, setLoading] = useState(false);

    async function handleFormSubmit (formValues) {
        if (formValues.usermail === '' || formValues.password === '') {
            showMessage ({
                message: 'Alanları boş bırakmayınız!',
                type: 'default',
                backgroundColor: 'white',
                color: colors.darkgray,
                
            })
            return;
        }
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword (
                formValues.usermail, 
                formValues.password
            )
            navigation.navigate('TabPages')
            setLoading(false)
        } catch (error) {
            showMessage ({
                message: authErrorMessage(error.code),
                type: 'default',
                backgroundColor: 'white',
                color: colors.darkgray
            })
            setLoading(false)
        }
    }


    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Image style={styles.logo} source={require('../../../assets/logo/logo.png')} />
                </View>
            
                <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                    {({values, handleChange, handleSubmit}) => (
                        <>
                            <Input 
                                placeholder="E-Posta"
                                onType={handleChange('usermail')}
                                value={values.usermail}
                                primaryIcon="account-circle-outline"
                                
                            />
                            <Input
                                placeholder="Şifre"
                                onType={handleChange('password')}
                                value={values.password}
                                primaryIcon='eye-off-outline'
                                secondaryIcon='eye-outline'
                                isSecure={true}
                                changeableIcon={true}
                            />
                            <Button text="GİRİŞ YAP" onPress={handleSubmit} loading={loading} />
                        </>
                    )}
                </Formik>
                <Button text="ÜYE OL" theme="secondary" onPress={handleSignUp} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login