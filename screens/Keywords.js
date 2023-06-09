import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, ActivityIndicator, Text } from 'react-native';

// Colors
import { COLORS } from '../colors/colors';

// Firebase and firestore
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import TopBar from '../components/TopBar';
import KeywordCard from '../components/KeywordCard';

export default function Keywords() {

    const [keywords, setKeywords] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        try {
            const collectionRef = collection(db, "keywords")
            const q = query(collectionRef, orderBy("name"))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setKeywords(
                    snapshot.docs.map((doc) => ({
                        name: doc.data().name,
                        description: doc.data().description
                    }))
                );
                // for filtering
                setFilteredData(
                    snapshot.docs.map((doc) => ({
                        name: doc.data().name,
                        description: doc.data().description
                    }))
                );
            });
            setIsLoading(false)
            return unsubscribe
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>No keywords found...</Text>
            </View>
        );
    }

    // Search bar for keywords
    const searchKeyword = (text) => {
        if (text) {
            const newData = keywords.filter((item) => {
                const itemData =
                    item.name
                        ? item.name
                        : ''
                const textData = text
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearch(text)
        } else {
            setFilteredData(keywords)
            setSearch(text)
        }
    }

    return (
        <View style={styles.container}>
            <TopBar header='Keywords' />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search..."
                    style={styles.input}
                    autoCorrect={false}
                    value={search}
                    onChangeText={(text) => searchKeyword(text)}
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => <KeywordCard item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
    },
    input: {
        backgroundColor: COLORS.white,
        padding: 8,
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: '90%'
    },
    sectionHeader: {
        color: COLORS.neonPurple,
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginLeft: 10
    },
})