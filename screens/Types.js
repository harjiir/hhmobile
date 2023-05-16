import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

// Colors
import { COLORS } from '../colors/colors';

// Firebase and firestore
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import TopBar from '../components/TopBar';
import TypesCard from '../components/TypesCard';

export default function Types() {

    const [types, setTypes] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, "types")
        const q = query(collectionRef, orderBy("name"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTypes(
                snapshot.docs.map((doc) => ({
                    name: doc.data().name,
                    description: doc.data().description
                }))
            );
        });
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <TopBar header='Types' />
            <FlatList
                data={types}
                renderItem={({ item }) => <TypesCard item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
    },
});
