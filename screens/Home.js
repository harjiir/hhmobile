import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Colors
import { COLORS } from '../colors/colors';

// firebase auth
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function Home() {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("LogIn")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <Ionicons name="log-out-outline" size={30} color={COLORS.primary} style={styles.icon} onPress={() => Alert.alert(
                    'Sign Out?',
                    'Are you sure you want to sign out?',
                    [
                        {
                            text: 'No',
                            style: 'cancel'
                        },
                        {
                            // if yes, handle sign out
                            text: 'Yes',
                            onPress: () => handleSignOut()
                        }
                    ])} />
                <Text style={[styles.icon, styles.logo]}>
                    <Text style={{ fontWeight: 'bold' }}>Dream</Text>Keeper
                </Text>
                <Ionicons name="md-person-circle-outline" size={30} color={COLORS.primary} style={styles.icon} onPress={() => navigation.navigate('UserProfile')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.border,
        borderWidth: 0.5,
        paddingBottom: 14,
    },
    icon: {
        marginTop: 50,
        marginHorizontal: 20
    },
    logo: {
        color: COLORS.primary,
        fontSize: 18,
    }
});
