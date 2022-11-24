import { View, Text, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../firebase";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const SignUpForm = ({ navigation }) => {

    const SignUpFormSchema = Yup.object().shape({
        username: Yup.string().required().min(2, 'A username is required.'),
        email: Yup.string().email().required('An email is required.'),
        password: Yup.string().required().min(8, 'Your password must have at least 8 characters.'),
    });

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignUp = async (username, email, password) => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Firebase Sign Up successful.", email, password)
            // const docRef = await addDoc(collection(db, "users"), {
            //     owner_uid: authUser.user.uid,
            //     username: username,
            //     email: authUser.user.email,
            //     profile_picture: await getRandomProfilePicture(),
            // })
            const docRef = await setDoc(doc(db, "users", authUser.user.email), {
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })

        }
        catch (error) {
            if (error.message.includes("email-already-in-use"))
                Alert.alert("Email Already in Use", "What would you do next?",
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log("OK"),
                            style: 'cancel'
                        },
                        {
                            text: 'Log In',
                            onPress: () => navigation.goBack(),
                        },
                    ])
            else
                Alert.alert(error.message)
        }
    }

    return (
        <View className="mt-[80]">
            <Formik initialValues={{ username: '', email: '', password: '' }}
                onSubmit={(values) => {
                    onSignUp(values.username, values.email, values.password)
                }}
                validationSchema={SignUpFormSchema}
                validateOnMount={true}>
                {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
                    <>
                        <View className="rounded-[4] p-[12] bg-[#FAFAFA] mb-[10]" style={{ borderWidth: 1, borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red' }}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View className="rounded-[4] p-[12] bg-[#FAFAFA] mb-[10]" style={{ borderWidth: 1, borderColor: values.username.length < 1 || values.username.length >= 2 ? '#ccc' : 'red' }}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                autoFocus={true}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View className="rounded-[4] p-[12] bg-[#FAFAFA] mb-[40]" style={{ borderWidth: 1, borderColor: values.password.length < 1 || values.password.length >= 8 ? '#ccc' : 'red' }}>
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
                        <Pressable disabled={!isValid} className={`items-center justify-center min-h-[42] rounded-[4] ${!isValid ? 'bg-[#9ACAF7]' : 'bg-[#0096F6]'}`} onPress={handleSubmit}>
                            <Text className="text-[#fff]" style={{ fontHeight: '680', fontSize: 20 }}>Sign Up</Text>
                        </Pressable>
                        <View className="flex-row w-full justify-center mt-[50]">
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text className="text-[#6BB0F5]">Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
            </Formik>
        </View>
    )
}

export default SignUpForm