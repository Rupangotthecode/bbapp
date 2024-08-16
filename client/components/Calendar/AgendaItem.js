import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Alert, View, Text } from 'react-native';


const AgendaItem = ({ item }) => {
    const buttonPressed = useCallback(() => {
        Alert.alert('Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, [item]);

    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Events Planned Today</Text>
            </View>
        );
    }

    return (
        <View style={styles.AImainContainer} >
            <View style={styles.AIleftContainer}>
                <Text style={styles.itemHourText}>{item.hour}</Text>
                <Text style={styles.itemDurationText}>{item.duration}</Text>
            </View>
            <View style={styles.AIrightContainer}>
                <View style={styles.AItextContainer}>
                    <Text style={styles.itemTitleText}>{item.title}</Text>
                    <Text style={{ color: "green", fontWeight: "400" }}>{item?.tournament}</Text>
                    <View style={styles.AItagContainer}>
                        <View style={styles.AItag}>
                            <Text style={styles.AItagText}>Pool: {item?.poolNo}</Text>
                        </View>
                        <View style={styles.AItag}>
                            <Text style={styles.AItagText}>Match: {item?.matchNo}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemButtonContainer}>
                    <Button onPress={buttonPressed} mode="text" icon="information-outline" textColor="green" labelStyle={{ fontSize: 35, fontWeight: 700, padding: 0 }} compact={true}>

                    </Button>
                </View>
            </View>
        </View>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    AImainContainer: {
        padding: 20,
        backgroundColor: 'white',
        height: 140,
        padding: "4%",
        flexDirection: 'row',
    },
    AIleftContainer: {
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "center",
        width: "23%"
    },
    AIrightContainer: {
        backgroundColor: 'lightgray',
        width: "77%",
        padding: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderRadius: 15
    },
    AItextContainer: {
        width: "80%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    itemHourText: {
        color: 'green',
        fontSize: 24,
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 16,
        marginTop: 4,
        marginLeft: 4
    },
    itemTitleText: {
        color: 'green',
        fontWeight: '500',
        fontSize: 20,
    },
    AItagContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
    },
    AItag: {
        backgroundColor: "green",
        padding: "2%",
        paddingLeft: "5%",
        paddingRight: "5%",
        borderRadius: 20,
    },
    AItagText: {
        color: 'white',
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: "center"
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14
    }
});



