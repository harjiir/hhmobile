import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from "react-native-paper";

// Colors
import { COLORS } from '../colors/colors';

export default function TypesCard({ item }) {

    /* Show more text functionality */
    const [showMore, setShowMore] = useState(false)

    return (
        <View style={styles.container}>
            <Card mode='contained' style={styles.card}>
                <Card.Content>
                    <Title style={styles.cardTitle} >{item.name}</Title>
                    <Paragraph numberOfLines={showMore ? 0 : 2} variant="bodyMedium">{item.description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode={"text"} textColor={COLORS.secondary} onPress={() => setShowMore(!showMore)}>{showMore ? "Close" : "Read More"}</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: 'transparent',
        marginHorizontal: 10
    },
    cardTitle: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },
});