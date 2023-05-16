import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';

// screens
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import UserProfile from '../screens/UserProfile';
import AddDream from '../screens/AddDream';
import Dreams from '../screens/Dreams';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, headerLeft: null, gestureEnabled: false }} name="LogIn" component={LogIn} />
                <Stack.Screen options={{ title: '', headerTransparent: true, animation: 'slide_from_right' }} name="SignUp" component={SignUp} />
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeTabs} />
                <Stack.Screen options={{ title: '', headerTransparent: true, animation: 'slide_from_right' }} name="UserProfile" component={UserProfile} />
                <Stack.Screen options={{ title: '', headerTransparent: true, animation: 'slide_from_right' }} name="AddDream" component={AddDream} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});