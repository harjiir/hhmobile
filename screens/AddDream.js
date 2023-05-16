import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Firebase and firestore
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// Colors
import { COLORS } from '../colors/colors';

export default function AddDream() {

    const navigation = useNavigation();

    const [dreamDate, setDreamDate] = useState('')
    const [keyword, setKeyword] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')

    const addDream = () => {
        try {
            addDoc(collection(db, "savedDreams"), {
                dreamDate: { dreamDate },
                keyword: { keyword },
                description: { description },
                type: { type }
            });
            console.log("New dream added")
            setDreamDate('')
            setDescription('')
            setKeyword('')
            setType('')
            navigation.goBack()
        } catch (e) {
            console.error("Error adding dream: ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Dream</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputBox}>
                    <Text style={styles.inputHeader}>Date</Text>
                    <TextInput
                        placeholder="April 24, 2023"
                        value={dreamDate}
                        onChangeText={value => setDreamDate(value)}
                        style={styles.inputField}
                    />
                    <TouchableOpacity onPress={() => setDreamDate('')} style={{ alignSelf: 'flex-end' }}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputHeader}>Type</Text>
                    <TextInput
                        placeholder="Nightmare, Lucid dream..."
                        value={type}
                        onChangeText={value => setType(value)}
                        style={styles.inputField}
                    />
                    <TouchableOpacity onPress={() => setType('')} style={{ alignSelf: 'flex-end' }}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputHeader}>Keyword</Text>
                    <TextInput
                        placeholder="Snow, parents, a festival..."
                        value={keyword}
                        onChangeText={value => setKeyword(value)}
                        style={styles.inputField}
                    />
                    <TouchableOpacity onPress={() => setKeyword('')} style={{ alignSelf: 'flex-end' }}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputHeader}>Description</Text>
                    <TextInput
                        placeholder="Describe your dream"
                        value={description}
                        onChangeText={value => setDescription(value)}
                        multiline
                        numberOfLines={5}
                        maxLength={1000}
                        autoCorrect={false}
                        textAlignVertical='top'
                        style={styles.inputField}
                    />
                    <TouchableOpacity onPress={() => setDescription('')} style={{ alignSelf: 'flex-end' }}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formActions}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.actionButton}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addDream}>
                        <Text style={[styles.actionButton, { color: COLORS.white, backgroundColor: COLORS.secondary }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 80,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    formContainer: {
        margin: 20
    },
    inputHeader: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputField: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 0.5,
        borderColor: COLORS.border,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    errorMsg: {
        color: COLORS.secondary,
        fontSize: 15
    }
})