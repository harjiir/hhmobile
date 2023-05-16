import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Icon
import { MaterialIcons } from '@expo/vector-icons';

// Firebase and firestore
import { db } from '../firebaseConfig';
import { collection, deleteDoc, doc, updateDoc, deleteField } from "firebase/firestore";

// Colors
import { COLORS } from '../colors/colors';

export default function DreamCard({ item }) {

    /* Show more text functionality */
    const [showMore, setShowMore] = useState(false)

    const navigation = useNavigation();

    const handleDeleteDream = (item) => {
        const id = item.key
        console.log("Dream key: ", id)
        const dreamRef = doc(db, `dreams/${id}`)
        try {
            updateDoc(dreamRef, {
                description: deleteField(),
                dreamDate: deleteField(),
                keyword: deleteField(),
                type: deleteField()
            })
            deleteDoc(doc(db, `dreams/${id}`))
            console.log("Dream deleted succesfully")
            navigation.navigate('My Dreams')
        } catch (e) {
            console.log("Error while deleting dream: ", e)
        }
    }

    return (
        <View style={styles.container}>
            <Card mode='contained' style={styles.card}>
                <Card.Content>
                    <View style={styles.cardHeader}>
                        <Title style={styles.cardTitle} >{item.dreamDate.toDateString()}</Title>
                        <MaterialIcons name="delete-outline" size={24} color='#D30000' onPress={() => Alert.alert(
                            'Delete dream?',
                            'Are you sure you want to delete this dream?',
                            [
                                {
                                    text: 'No',
                                    style: 'cancel'
                                },
                                {
                                    // if yes, handle delete dream
                                    text: 'Yes',
                                    onPress: () => handleDeleteDream(item)
                                }
                            ])} />
                    </View>
                    <Paragraph variant="bodyMedium" style={{ fontWeight: 'bold' }}>{item.type}</Paragraph>
                    <Paragraph variant="bodyMedium" style={{ fontWeight: 'bold' }}>{item.keyword}</Paragraph>
                    <Paragraph numberOfLines={showMore ? 0 : 2} variant="bodyMedium">{item.description}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ alignSelf: 'flex-start', padding: 0 }}>
                    <TouchableOpacity mode={"text"} onPress={() => setShowMore(!showMore)}>{showMore ? <Text style={styles.actions}>Close</Text> : <Text style={styles.actions}>Open</Text>}</TouchableOpacity>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    card: {
        marginHorizontal: 10,
        backgroundColor: 'transparent',
        borderTopColor: COLORS.border,
        borderTopWidth: 0.5
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: COLORS.lightPurple,
        fontWeight: 'bold',
    },
    actions: {
        color: COLORS.secondary,
        padding: 8,
        fontSize: 15

    }
});