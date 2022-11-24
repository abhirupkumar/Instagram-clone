import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ navigation }) => {
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log("Signed Out Successfully !")
        }
        catch (error) {
            Alert.alert(error.message)
        }
    };
    return (
        <View className="justify-between items-center flex-row mx-[20]">
            <TouchableOpacity onPress={handleSignOut}>
                <Image style={{
                    width: 100,
                    height: 50,
                    resizeMode: "contain"
                }} source={require('../../assets/logo.png')} />
            </TouchableOpacity>

            <View className="flex-row">
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image source={{
                        uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png"
                    }} style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10,
                        resizeMode: "contain"
                    }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{
                        uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png"
                    }} style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10,
                        resizeMode: "contain"
                    }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="bg-[#FF3250] absolute left-[20] bottom-[18] w-[25] h-[18] rounded-full justify-center items-center z-[198]">
                        <Text className="text-white font-normal">11</Text>
                    </View>
                    <Image source={{
                        uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png"
                    }} style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10,
                        resizeMode: "contain"
                    }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header