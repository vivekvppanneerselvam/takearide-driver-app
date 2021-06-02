import React, { useState, useEffect } from "react";
import { Text, Dimensions, TouchableHighlight, Button, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");

function Confirmation(props) {
    return (
        <View style={styles.fareContainer}>
            <View style={styles.btnContainer}>
                <View style={styles.buttonContainer}>
                    {!props.isTripStart && <Button title={'Start Trip'} onPress={() => props.onTripStart('confirm')} />}
                    {props.isTripStart && <Button title={'Trip Completed'} onPress={() => props.onTripComplete('confirm')} />}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={'Cancel Trip'} onPress={() => props.onTripCancel('cancel')} />
                </View>
            </View>
        </View>
    );
}

export default Confirmation;

const styles = {
    container: {
        flexDirection: 'row',
        marginBottom: 5
    },
    btnContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',

    },
    fareContainer: {
        width: width,
        height: 175,
        padding: 10,
        backgroundColor: "white"
    },
    fareText: {
        fontSize: 12,
        marginBottom: 10

    },
    amount: {
        fontWeight: "bold",
        fontSize: 16
    },
    btn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 15,
        backgroundColor: "#1abc9c",
        borderColor: '#009387',
        border: '1px solid transparent'
        // backgroundImage: linear-gradient('141deg', '#9fb8ad 0%', '#1fc8db 51%', '#2cb5e8 75%')
    }
};