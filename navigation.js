import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CommentsScreen from './screens/CommentsScreen';
import SettingsScreen from './screens/SettingsScreen';
import 'react-native-gesture-handler';
import { Platform } from 'react-native';

export const SignedInStack = () => {

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
        gestureEnabled: true,
        ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS)
    }

    return (
        <NavigationContainer >
            <Stack.Navigator intialRouteName='HomeScreen' screenOptions={screenOptions}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='CommentsScreen' component={CommentsScreen} />
                <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
                <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const SignedOutStack = () => {

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
        gestureEnabled: true,
        ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS)
    }

    return (
        <NavigationContainer >
            <Stack.Navigator intialRouteName='LoginScreen' screenOptions={screenOptions}>
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}