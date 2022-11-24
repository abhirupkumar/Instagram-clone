import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import AddNewPost from '../components/NewPost/AddNewPost'

export default function NewPostScreen({ navigation }) {
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-black flex-1">
            <AddNewPost navigation={navigation} />
        </SafeAreaView>
    )
}