import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Colors
import { COLORS } from '../colors/colors';

export default function BigLogo() {
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.logo}>
                <Text style={{ fontWeight: 'bold' }}>Dream</Text>Keeper
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        marginBottom: 100
    },
    logo: {
        fontFamily: 'sans-serif',
        fontSize: 45,
        color: COLORS.primary,
    }
});
