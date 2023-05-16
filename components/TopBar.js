import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

// Colors
import { COLORS } from '../colors/colors';

// firebase and auth
import { auth } from '../firebaseConfig';

export default function TopBar({ header }) {

    const navigation = useNavigation();

    return (
        <View style={styles.topBarContainer}>
            <Text style={styles.header}>{header}</Text>
            <Ionicons name="md-person-circle-outline" size={30} color={COLORS.primary} style={styles.icon} onPress={() => navigation.navigate('UserProfile')} />
        </View>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.border,
        borderBottomWidth: 0.5
    },
    header: {
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 30,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 50,
        marginRight: 20
    },
});