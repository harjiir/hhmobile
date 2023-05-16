import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Firebase and firestore
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// Colors
import { COLORS } from '../colors/colors';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// My own components
import TopBar from '../components/TopBar';
import DreamCard from '../components/DreamCard';

export default function Dreams() {

    const navigation = useNavigation();

    const [dreams, setDreams] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, "dreams")
        const q = query(collectionRef, orderBy("dreamDate", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setDreams(
                snapshot.docs.map((doc) => ({
                    key: doc.id,
                    dreamDate: doc.data().dreamDate.toDate(), /* toDate() object */
                    keyword: doc.data().keyword,
                    description: doc.data().description,
                    type: doc.data().type
                }))
            );
        });
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <TopBar header='My Dreams' />
            <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="sort" size={30} color='#00233D' style={{ marginTop: 5 }} onPress={() => alert("This is sort button")} />
                <TouchableOpacity onPress={() => navigation.navigate('AddDream')}>
                    <Text style={styles.buttonText} >+ Add</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dreams}
                    renderItem={({ item }) => <DreamCard item={item} />}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        padding: 8,
        borderRadius: 8
    }
});
