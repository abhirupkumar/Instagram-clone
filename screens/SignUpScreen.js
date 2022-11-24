import { View, Text, Image } from 'react-native'
import React from 'react'
import SignUpForm from '../components/SignUpScreen/SignUpForm';

const SignUpScreen = ({ navigation }) => {

    const INSTAGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png';

    return (
        <View className="flex-1 bg-white pt-[58] px-[12]">
            <View className="items-center mt-[60]">
                <Image source={{
                    uri: INSTAGRAM_LOGO,
                    height: 100,
                    width: 100
                }} />
            </View>
            <SignUpForm navigation={navigation} />
        </View>
    )
}

export default SignUpScreen