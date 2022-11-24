import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormickPostUploader from './FormickPostUploader'

const AddNewPost = ({ navigation }) => {
    return (
        <View className="mx-[10]">
            <Header navigation={navigation} />
            <FormickPostUploader navigation={navigation} />
        </View>
    )
}

const Header = ({ navigation }) => {
    return (
        <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/98/ffffff/back.png' }}
                    style={{
                        width: 30,
                        height: 30
                    }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }} className="text-white font-[700] mr-[23]">NEW POST</Text>
            <Text></Text>
        </View>
    )
}

export default AddNewPost