import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    Button,
} from 'react-native';
const closeButton = require('../../assests/img/btnClose.png');

export default function Confirmation(props) {
    return (
        <>
            <View style={styles.container}>
                <TouchableHighlight style={styles.closeButton} underlayColor="#FFFFFF" onPress={() => props.onCloseHandler()}>
                    <Image style={styles.button} source={closeButton} />
                </TouchableHighlight>
                <Text style={styles.title}>Confirm Booking</Text>
            </View>

            <Text >Name: {props.data.userId}</Text>
            <Text >Total Rs: {props.data.fare}</Text>

            <View style={styles.titleColumn}>
                <Text style={styles.info_title}>{'Pick up address'}</Text>
            </View>
            <View style={styles.descriptionColumn}>
                <Text style={styles.description}>{props.data.pickUp.name}</Text>
                <Text style={styles.address}>{props.data.pickUp.address}</Text>
                <Text style={styles.address}>{props.data.pickUp.latitude} {props.data.pickUp.longitude}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.titleColumn}>
                <Text style={styles.info_title}>{'Drop address'}</Text>
            </View>
            <View style={styles.descriptionColumn}>
                <Text style={styles.description}>{props.data.dropOff.name}</Text>
                <Text style={styles.address}>{props.data.dropOff.address}</Text>
                <Text style={styles.address}>{props.data.dropOff.latitude} {props.data.dropOff.longitude}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button title={'Confirm'} onPress={() => props.confirmationHandler('confirm')} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title={'Cancel'} onPress={() => props.confirmationHandler('cancel')} />
                </View>
            </View>



        </>
    );
}

const styles = StyleSheet.create({
    closeButton: {
        zIndex: 1,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',

    },
    info_title: {
        color: '#24988D',
        fontSize: 16,
    },
    /*  btnContainer: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
     }, */
    buttonContainer: {
        flex: 1,
        padding: 3
    },
    description: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    }, address: {
        color: '#7B7B7B',
        fontSize: 16,
        marginTop: 10,
    },
    title: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        zIndex: 0,
    },
    bodyContent: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '3%',
    },
    buttonRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%',
        width: '100%',
    },
    descriptionColumn: {
        flex: 2,
        flexDirection: 'column',
        padding: 10
    },
    horizontalLine: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        marginBottom: '3%',
        marginTop: '3%',
    },
    refundText: {
        color: '#7B7B7B',
        fontSize: 12,
        marginBottom: '3%',
    },
    row: {
        flexDirection: 'row',
        width: '80%',
    },
    titleColumn: {
        flex: 1,
        flexDirection: 'column',
    },
});