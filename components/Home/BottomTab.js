import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Divider } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const BottomTab = ({ icons, navigation }) => {

    const [activeTab, setActiveTab] = useState('Home')
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = () => {
        const unsubscribe = doc(collection(db, 'users'), auth.currentUser.email);
        onSnapshot(unsubscribe, (snapshot) => setCurrentLoggedInUser({
            username: snapshot.data().username,
            profilePicture: snapshot.data().profile_picture,
        }));
        return unsubscribe;
    }

    useEffect(() => {
        getUsername()
    }, [])

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => icon.name != 'Profile' ? setActiveTab(icon.name) : navigation.push("SettingsScreen")}>
            {icon.name != 'Profile' ? <Image source={{
                uri: activeTab == icon.name ? icon.active : icon.inactive
            }}
                style={{
                    width: 30,
                    height: 30,
                }} />
                :
                <Image source={{
                    uri: currentLoggedInUser?.profilePicture
                }}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                        borderWidth: activeTab === 'Profile' ? 2 : 0,
                        borderColor: 'orange'
                    }} />
            }
        </TouchableOpacity>
    )

    return (
        <View className="absolute w-full bottom-0 z-[999] bg-[#000]">
            <Divider width={1} orientation='vertical' />
            <View className="flex-row justify-around h-[50] pt-[10]">
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

export default BottomTab