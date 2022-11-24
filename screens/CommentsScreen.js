import { SafeAreaView } from 'react-native'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import Header from '../components/CommentsScreen/Header'
import Comments from '../components/CommentsScreen/Comments'
import AddComments from '../components/CommentsScreen/AddComments'
import React from 'react'

export default function CommentsScreen({ route, navigation }) {

    const { post } = route.params

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-black flex-1">
            <Header navigation={navigation} />
            <AddComments post={post} navigation={navigation} />
            <Comments post={post} />
        </SafeAreaView>
    )
}
