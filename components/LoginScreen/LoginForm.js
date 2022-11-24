import { View, Text, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
// import firebase from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../firebase";
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';

const LoginForm = ({ navigation }) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required.'),
        password: Yup.string().required().min(8, 'Your password must have at least 8 characters.'),
    });

    const onLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Firebase login successful.", email, password)
        }
        catch (error) {
            if (error.message.includes("wrong-password") || error.message.includes("user-not-found"))
                Alert.alert("Invalid Credentials", "What would you do next?",
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log("OK"),
                            style: 'cancel'
                        },
                        {
                            text: 'Sign Up',
                            onPress: () => navigation.push('SignUpScreen'),
                        },
                    ])
            else
                Alert.alert(error.message)
        }
    }

    return (
        <View className="mt-[80]">
            <Formik initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}>
                {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
                    <>
                        <View className="rounded-[4] p-[12] bg-[#FAFAFA] mb-[10]" style={{ borderWidth: 1, borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red' }}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View className="rounded-[4] p-[12] bg-[#FAFAFA] mb-[10]" style={{ borderWidth: 1, borderColor: values.password.length < 1 || values.password.length >= 8 ? '#ccc' : 'red' }}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View className="items-end mb-[30]">
                            <Text className="text-[#6BB0F5]">Forgot Password?</Text>
                        </View>
                        <Pressable disabled={!isValid} className={`items-center justify-center min-h-[42] rounded-[4] ${!isValid ? 'bg-[#9ACAF7]' : 'bg-[#0096F6]'}`} onPress={handleSubmit}>
                            <Text className="text-[#fff]" style={{ fontHeight: '680', fontSize: 20 }}>Log In</Text>
                        </Pressable>
                        <View className="flex-row w-full justify-center mt-[50]">
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                                <Text className="text-[#6BB0F5]">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
            </Formik>
        </View>
    )
}

export default LoginForm