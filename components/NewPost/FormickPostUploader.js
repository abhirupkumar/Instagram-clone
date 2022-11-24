import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import { auth, db } from '../../firebase';
import { doc, getDoc, addDoc, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';

const PLACEHOLDER_IMG = '../../assets/icons8-add-image-96(-xxxhdpi).png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A Image URL is required.'),
    capion: Yup.string().max(2280, 'Caption has reached the character limit.')
})

const FormickPostUploader = ({ navigation }) => {

    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = async () => {
        const unsubscribe = doc(collection(db, 'users'), auth.currentUser.email);
        onSnapshot(unsubscribe, (snapshot) => setCurrentLoggedInUser({
            username: snapshot.data().username,
            profilePicture: snapshot.data().profile_picture,
        }));
        return unsubscribe;
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = async (imageUrl, caption) => {
        const unsub = doc(collection(db, 'users'), auth.currentUser.email)
        const unsubscribe = addDoc(collection(unsub, "posts"), {
            imageUrl: imageUrl,
            owner_uid: auth.currentUser.uid,
            owner_email: auth.currentUser.email,
            caption: caption,
            createdAt: serverTimestamp(),
            likes_by_users: [],
            comments: []
        }).then(() => navigation.goBack())

        return unsubscribe;
    }

    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => { uploadPostToFirebase(values.imageUrl, values.caption) }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View className="m-[20] justify-between flex-row">
                        {validUrl.isUri(thumbnailUrl) ? <Image source={{
                            uri: thumbnailUrl
                        }}
                            style={{
                                width: 100,
                                height: 100
                            }} />
                            :
                            <Image source={require(PLACEHOLDER_IMG)}
                                style={{
                                    width: 100,
                                    height: 100
                                }} />}
                        <View className="flex-1 ml-[12]">
                            <TextInput style={{ color: 'white', fontSize: 18 }} placeholder='Write a caption...' placeholderTextColor='gray'
                                multiline={true} onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation="horizontal" />
                    <TextInput onChange={(e) => setThumbnailUrl(e.nativeEvent.text)} style={{ color: 'white', fontSize: 18 }} placeholder='Enter Image Url' placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.imageUrl}</Text>
                    )}

                    <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                        <Text className={`mx-auto my-4 ${!isValid ? 'text-gray-400' : 'text-blue-500'}`}>Share</Text>
                    </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}

export default FormickPostUploader