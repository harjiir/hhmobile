import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';

import BigLogo from '../components/BigLogo';

// firebase auth
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';

// Colors
import { COLORS } from '../colors/colors';

export default function LogIn() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    // Authentication state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // if User is signed in navigate to home
                const uid = user.uid;
                // wipe the navigator state and replace it with a new route
                navigation.replace("HomeScreen")
            }
        });
        return unsubscribe
    }, [])

    // firebase auth error handler
    const authCodeToMessage = (authCode) => {
        switch (authCode) {
            case "auth/invalid-email":
                return "Invalid Log In, please check your email";
            case "auth/user-not-found":
                return "User not found, Create an account or check your email and password"
            case "auth/wrong-password":
                return "Invalid password";
            case "auth/missing-password":
                return "Password required"
            default:
                return "";
        }
    };

    // Handling sign in
    const handleSignIn = () => {
        try {
            // validation for email
            if (!email) {
                return setErrorMsg("Please enter Email");
            }
            else if (!email.includes("@") || !email.includes(".com")) {
                return setErrorMsg("Please check your Email");
            }
            // checking firebase sign in
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log('Logged in with: ', user.email)
                })
                // catch error if it occurred
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    setErrorMsg(authCodeToMessage(error.code))
                });
        } catch {
            setErrorMsg(authCodeToMessage(error.code));
            console.log(error.code);
        }
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ImageBackground style={styles.bg} source={require('../img/bg.png')}>
            <KeyboardAvoidingView style={styles.container}>
                <BigLogo />
                <Text style={{ marginTop: 80, fontSize: 20, fontWeight: 'bold', color: COLORS.white, marginBottom: 20 }}>Log In</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={value => setEmail(value)}
                        style={styles.input}
                        underlineColor={COLORS.primary}
                        activeUnderlineColor={COLORS.primary}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={value => setPassword(value)}
                        style={styles.input}
                        secureTextEntry
                        underlineColor={COLORS.primary}
                        activeUnderlineColor={COLORS.primary}
                    />
                    {/* Show error message for invalid login */}
                    <Text style={styles.invalidLogInMessage}>{errorMsg}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSignIn} style={styles.logInButton}>
                        <Text style={styles.logInText}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: 'bold', marginTop: 50 }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.accountButton}>
                        <Text style={styles.accountText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalidLogInMessage: {
        color: COLORS.secondary,
        paddingLeft: 10,
        paddingBottom: 10
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'transparent',
        marginVertical: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logInButton: {
        backgroundColor: COLORS.secondary,
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 20
    },
    logInText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    accountButton: {
        marginTop: 10,
        padding: 10
    },
    accountText: {
        color: COLORS.secondary,
        fontSize: 15,
    }
});
