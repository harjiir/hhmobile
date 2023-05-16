import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, CommonActions } from "@react-navigation/native";

// firebase auth
import { deleteUser, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

// Colors
import { COLORS } from '../colors/colors';

export default function UserProfile() {
    const navigation = useNavigation();

    // Delete account
    const handleDeleteUser = () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user).then(() => {
                // User deleted
                console.log("User deleted succesfully")
                // Reset navigation and prevent back actions
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'LogIn' },
                        ],
                    })
                );
            }).catch((e) => {
                // An error ocurred
                console.log("Error", e)
            });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Text>{auth.currentUser?.email}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => Alert.alert(
                "Delete account?",
                "This can't be undone! Are you sure you want to delete this account?",
                [
                    {
                        text: 'No',
                        style: 'cancel'
                    },
                    {
                        // if yes, delete account
                        text: 'Yes',
                        onPress: () => handleDeleteUser()
                    }
                ])}>
                <Text style={styles.text}>Delete account</Text>
            </TouchableOpacity>
        </View >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        padding: 10,
        marginTop: 50
    },
    text: {
        color: 'red',
        fontSize: 20,
    }
})