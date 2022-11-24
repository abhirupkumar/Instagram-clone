import { View, Text, SafeAreaView } from 'react-native'
import SafeViewAndroid from '../utils/SafeViewAndroid'
import React from 'react'
import Header from '../components/SettingsScreen/Header'
import Settings from '../components/SettingsScreen/Settings'

export default function SettingsScreen({ navigation }) {

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-black flex-1">
            <View>
                <Header navigation={navigation} />
                <Settings navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}
