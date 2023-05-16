import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

// Navigator
const Tab = createBottomTabNavigator();

// Tab Screens
import Home from '../screens/Home';
import Dreams from '../screens/Dreams';
import Types from '../screens/Types';
import Keywords from '../screens/Keywords';

// Colors
import { COLORS } from '../colors/colors';

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTransparent: true,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: COLORS.bg,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopWidth: 0.5,
                    borderColor: COLORS.border,
                    height: 50
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Types"
                component={Types}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="bookmarks" size={22} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Keywords"
                component={Keywords}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Octicons name="hash" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Dreams"
                component={Dreams}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="duplicate" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
