import React, { useState, useEffect } from "react";
import { Text, Dimensions, TouchableHighlight, Button, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");

function Navigate(props) {
    return (
        <>
            <View style={styles.container}>
                <View style={{ borderBottomWidth: 1, marginBottom: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text>Navigate {!props.isTripStart ? 'Pick Up ': 'Drop Off' } </Text>
                    <Icon style={styles.icon} name={'my-location'}></Icon>
                </View>
            </View>
        </>
    )
}


export default Navigate

const styles = {
    container: {
        width: width,
        height: 75,
        padding: 10,
        backgroundColor: "white"
    },
    icon: {
        color: "#fff",
        fontSize: 40,
        marginTop: 15
    },
}