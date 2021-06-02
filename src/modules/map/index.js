import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navigate from './navigate'
import Confirmation from './confirmation'
import MapContainer from './mapcontainer'
const carMarker = require("../../assests/img/carmarker.png");
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { getCurrentLocation } from '../passengers/action'
import { updateTripStarted, updateTripCompleted } from './action'
import { Map } from 'immutable'


const MapView = (props) => {
    const { bookingData } = props.route.params
    console.log("bookingData", bookingData)
    const [currLoc, setCurrLoc] = useState({})
    /* const [confirmData, setConfirmData] = useState({}) */
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTripComplete, setModalTripComplete] = useState(false);
    const [isTripStart, setIsTripStart] = useState(false);
    const [number, setNumber] = useState('');

    useEffect(() => {
        //setInterval(async () => {
        //await 
        props.getCurrentLocation();
        //}, 15000)
    }, [])

    useEffect(() => {
        if (!props.current_location_loading) {
            console.log("current_location::", props.current_location)
            setCurrLoc(prevState => {
                prevState = props.current_location
                return ({ ...prevState })
            })
            /*  let data = {
                 "locationId": "5eb1959850caeb3b977c1669",
                 "latitude": props.current_location.toJS().data['latitude'],
                 "longitude": props.current_location.toJS().data['longitude']
             }
             setInterval(async () => {
                 props.updateCurrentDriverLocation(data)
             }, 30000) */

        }
    }, [props.current_location_loading])

    useEffect(() => {
        if (!props.update_trip_start_loading) {
            console.log("he he",props.update_trip_start)
            if (!props.update_trip_start.error) {
                setIsTripStart(true)
                setModalVisible(false)
            }
        }
    }, [props.update_trip_start_loading])

    useEffect(() => {
        if (!props.trip_completed) {
            if (!props.trip_completed.error) {
                setModalTripComplete(false)
            }
        }
    }, [props.trip_completed_loading])

    function handleTripComplete() {
        setModalTripComplete(true)
    }

    function handleTripStart() {
        setModalVisible(true)
    }

    function handleTripCancel() {

    }

    function tripCloseConfirm() {
        props.updateTripCompleted({ id: bookingData._id })
    }

    function checkOTP() {
        console.log("otpotptptp", number)
        if (parseInt(number) === bookingData.otp) {
            props.updateTripStarted(bookingData._id, { otp: bookingData.otp })

        } else {
            Alert.alert("Error", "Entered OTP is invalid")
        }
    }

    return (
        <>
            <Navigate isTripStart={isTripStart} />
            <MapContainer bookingData={bookingData} currLoc={currLoc} carMarker={carMarker} isTripStart={isTripStart} />
            <Confirmation onTripComplete={handleTripComplete} onTripStart={handleTripStart} onTripCancel={handleTripCancel} isTripStart={isTripStart} />
            <Modal animationType="slide" transparent={true} visible={modalTripComplete} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalTripComplete(!modalTripComplete);
            }}>
                <View>
                    <Text> Are sure trip is completed ?</Text>
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => tripCloseConfirm()}>
                        <Text style={styles.textStyle}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalTripComplete(!modalTripComplete)}>
                        <Text style={styles.textStyle}>No</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Text style={styles.modalText}>OTP</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => setNumber(value)}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => checkOTP()}>
                            <Text style={styles.textStyle}>Check</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        confirm_booking_loading: state.PassengersReducer.getIn(['confirm_booking', 'loading'], true),
        confirm_booking: state.PassengersReducer.getIn(['confirm_booking'], new Map()),
        current_location_loading: state.PassengersReducer.getIn(['current_geo_location', 'loading'], true),
        current_location: state.PassengersReducer.getIn(['current_geo_location', 'data'], new Map()),
        update_trip_start_loading: state.MapReducer.getIn(['update_trip_start', 'loading'], true),
        update_trip_start: state.MapReducer.getIn(['update_trip_start'], new Map()),
        trip_completed_loading: state.MapReducer.getIn(['trip_completed', 'loading'], true),
        trip_completed: state.MapReducer.getIn(['trip_completed'], new Map()),
    }
}

export default connect(mapStateToProps, { getCurrentLocation, updateTripStarted, updateTripCompleted })(MapView)

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 80,
        margin: 12,
        borderWidth: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});