import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase';
import { arrayUnion, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';

export default function AddComments({ post, navigation }) {
    const [comment, setComment] = useState('')
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = () => {
        const user = auth.currentUser
        const unsubscribe = doc(collection(db, 'users'), auth.currentUser.email);
        onSnapshot(unsubscribe, (snapshot) => setCurrentLoggedInUser({
            username: snapshot.data().username,
            profilePicture: snapshot.data().profile_picture,
        }));
        return unsubscribe;
    }

    const uploadCommentToFirebase = (text) => {
        updateDoc(doc(collection(doc(collection(db, 'users'), post.owner_email), "posts"), post.id), {
            comments: arrayUnion(comment)
        }).then(() => {
        }).catch(error => {
            console.log("Error updating document: ", error)
        })
        setComment("")
        navigation.goBack()
    }

    useEffect(() => {
        getUsername()
    }, [])

    return (
        <>
            <View className="items-center px-4">
                <TextInput className="bg-gray-900 rounded-md mt-4 mb-2 p-3 w-full mx-4" placeholder='Comment...' placeholderTextColor="white" multiline={true} value={comment} onChange={(e) => setComment({ user: currentLoggedInUser.username, comment: e.nativeEvent.text, profile_picture: currentLoggedInUser.profilePicture, })} style={{
                    color: 'white'
                }} />
                <TouchableOpacity onPress={uploadCommentToFirebase} disabled={comment.length == 0}>
                    <Text className={`mx-auto my-4 ${comment.length == 0 ? 'text-gray-400' : 'text-blue-500'}`}>Share</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}