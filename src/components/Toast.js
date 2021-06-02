import React from "react";
import { View, StyleSheet, ToastAndroid, Platform, Button, StatusBar, Alert } from "react-native";


function Toast() {
    const showToast = () => {
        if (Platform.OS != 'android') {
            Alert.alert('adfasdf')
        } else {
            ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Toggle Toast" onPress={() => showToast()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#888888",
        padding: 8
    }
});

export default Toast;