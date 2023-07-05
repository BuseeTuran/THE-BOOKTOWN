import React, {useState} from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import auth from "@react-native-firebase/auth";

import styles from "./Sign.style";
import colors from "../../../styles/colors";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import authErrorMessage  from "../../../utils/authErrorMessage";


const initialFormValues = {
    usermail: '',
    password: '',
    repassword: '',
}


const Sign = ({navigation}) => {

    function handleLogin () {
        navigation.goBack('LoginPage')
    }

    const [loading, setLoading] = useState(false);

    async function handleFormSubmit (formValues) {
        if (formValues.usermail === '' || formValues.password === '' || formValues.repassword === '') {
            showMessage ({
                message: 'Alanları boş bırakmayınız!',
                type: 'default',
                backgroundColor: 'white',
                color: colors.darkgray
            })
            return;
        } else if (formValues.password !== formValues.repassword) {
            showMessage ({
                message: 'Şifreler uyuşmuyor !',
                type: 'default',
                backgroundColor: 'white',
                color: colors.darkgray
            })
            return;
        }
        try {
            setLoading(true)
            await auth().createUserWithEmailAndPassword (
                formValues.usermail, 
                formValues.password,
            )
            showMessage ({
                message: 'Kullanıcı oluşturuldu',
                type: 'success'
            })
            
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
                            <Input
                                placeholder="Şifre tekrar"
                                onType={handleChange('repassword')}
                                value={values.repassword}
                                primaryIcon='eye-off-outline'
                                secondaryIcon='eye-outline'
                                isSecure={true}
                                changeableIcon={true}
                            />
                            <Button text="ÜYE OL" onPress={handleSubmit} loading={loading} />
                        </>
                    )}
                </Formik>
                <Button text="GERİ" theme="secondary" onPress={handleLogin} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Sign