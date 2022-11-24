import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { USERS } from '../../data/users'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const Stories = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const q = collection(db, 'users');
        onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map(user => ({ user: user.data().username, image: user.data().profile_picture })))
        });

    }, [])

    return (
        <View className="mb-[13]">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {users.map((story, index) => (
                    <View key={index} className="items-center justify-center">
                        <Image source={{
                            uri: story.image
                        }} style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                            marginLeft: 18,
                            borderWidth: 3,
                            borderColor: "#ff8501"
                        }} />
                        <Text className="text-white">
                            {story.user.length > 11 ? story.user[0] + story.user.slice(1, 6).toLowerCase() + "..." : story.user[0] + story.user.slice(1).toLowerCase()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default Stories