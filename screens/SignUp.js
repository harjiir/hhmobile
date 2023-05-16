import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// firebase auth
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebaseConfig';

// Colors
import { COLORS } from '../colors/colors';

export default function SignUp() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('');

    // firebase auth error handler
    const authCodeToMessage = (authCode) => {
        switch (authCode) {
            case "auth/invalid-email":
                return "Please check you email";
            case "auth/weak-password":
                return "Password must be at least six characters";
            default:
                return "";
        }
    };

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

    // Create new user to firebase
    const handleCreateUser = () => {
        try {
            if (!email) {
                return setErrorMsg("Please enter Email");
            }
            else if (!email.includes("@") || !email.includes(".com")) {
                return setErrorMsg("Please check your Email");
            }
            else if (password !== repeatPassword) {
                return setErrorMsg("Passwords do not match");
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredentials => {
                    const user = userCredentials.user
                    console.log('New User created: ', user.email)
                    navigation.navigate('HomeScreen')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    setErrorMsg(authCodeToMessage(error.code))
                })
        } catch (error) {
            setErrorMsg(authCodeToMessage(error.code));
            console.log(error.code);
        }
    }

    return (
        <ImageBackground style={styles.bg} source={require('../img/bg.png')}>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.header}>Create an Account</Text>
                {/* Error message for invalid login */}
                <Text style={styles.invalidLogInMessage}>{errorMsg}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChangeText={text => setRepeatPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleCreateUser} style={styles.submitButton}>
                        <Text style={styles.accountText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.terms}>
                    <Text style={styles.textTerms}>By registering, you confirm that you accept our <Text style={styles.link}>Terms of Use and Privacy Policy</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        height: '100%',
        width: '100%'
    },
    header: {
        color: COLORS.white,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50
    },
    invalidLogInMessage: {
        color: COLORS.secondary,
        padding: 10,
        borderRadius: 10,
        textAlign: 'center'
    },
    inputContainer: {
        width: '75%'
    },
    input: {
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    submitButton: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10
    },
    accountText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    terms: {
        width: '80%',
        alignItems: 'center',
    },
    textTerms: {
        marginTop: 40,
        alignSelf: 'center',
        color: COLORS.primary
    },
    link: {
        color: COLORS.secondary,
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.secondary
    },
});
