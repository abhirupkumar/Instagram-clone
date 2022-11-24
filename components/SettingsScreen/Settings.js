import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const Settings = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [changedUser, setChangedUser] = useState('');
    const [changedPic, setChangedPic] = useState('');

    const getUsername = () => {
        const unsubscribe = doc(collection(db, 'users'), auth.currentUser.email);
        onSnapshot(unsubscribe, (snapshot) => setUser({
            username: snapshot.data().username,
            profilePicture: snapshot.data().profile_picture,
        }));
        return unsubscribe;
    }

    const handleChange = () => {
        updateDoc(doc(collection(db, 'users'), auth.currentUser.email), {
            username: changedUser,
            profile_picture: changedPic,
        }).then(() => {
        }).catch(error => {
            console.log("Error updating document: ", error)
        })
        setChangedUser("");
        setChangedPic("");
        navigation.goBack();
    }

    useEffect(() => {
        getUsername()
    }, [])

    return (
        <View className="justify-between items-center px-4 py-10">
            <Image source={{ uri: user?.profilePicture }}
                style={{
                    width: 120,
                    height: 120,
                }} />
            <Text className="text-white font-extrabold text-xl mt-2 mb-10">{user.username}</Text>
            <TextInput className="bg-gray-900 rounded-md mt-4 mb-2 p-3 w-full" placeholder='Change Username' placeholderTextColor="white" value={changedUser} onChange={(e) => setChangedUser(e.nativeEvent.text)} style={{
                color: 'white'
            }} />
            <TextInput className="bg-gray-900 rounded-md mt-4 mb-2 p-3 w-full" placeholder='Change Profile Image' placeholderTextColor="white" value={changedPic} onChange={(e) => setChangedPic(e.nativeEvent.text)} multiline={true} style={{
                color: 'white'
            }} />
            <Text className="text-gray-500 text-sm mr-auto ml-2">Don't give google drive link</Text>
            <TouchableOpacity onPress={handleChange}>
                <View className="p-3 rounded-lg bg-violet-800 mt-5">
                    <Text className="text-white text-md">Change</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Settings