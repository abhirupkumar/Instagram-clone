import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeViewAndroid from '../utils/SafeViewAndroid';
import Header from '../components/Home/Header';
import Stories from '../components/Home/Stories';
import Post from '../components/Home/Post';
import { POSTS } from '../data/post';
import BottomTab from '../components/Home/BottomTab';
import { bottomTabIcons } from '../Bottom Tab Icons'
import { collectionGroup, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const q = query(collectionGroup(db, 'posts'), orderBy('createdAt', "desc"));
        // const q = query(collectionGroup(db, 'posts'));
        onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })))
        });

    }, [])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className=" container bg-black flex-1">
            <Header navigation={navigation} />
            <Stories />
            <ScrollView className="mb-10">
                {posts.map((post, index) => (
                    <Post key={index} post={post} navigation={navigation} />
                ))}
            </ScrollView>
            <BottomTab icons={bottomTabIcons} navigation={navigation} />
        </SafeAreaView>
    )
}

export default HomeScreen