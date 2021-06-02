import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import socketIO from 'socket.io-client';
import { updateLocationId, confirmBooking, 
    requestLocationPermission, getCurrentLocation, updateCurrentDriverLocation } from './action'
import Modal from 'react-native-modal';
import Confirmation from './confirmation'
import { Map } from 'immutable'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Alert, ScrollView, FlatList, Switch
} from 'react-native';



function Passengers(props) {
    //const { current: socket } = useRef(io("http://192.168.1.5:8080").connect());
    const [isEnabled, setIsEnabled] = useState(true);
    const [passengers, setPassengers] = useState([])
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);

    }
    //let passengers = []

    useEffect(() => {
        requestLocationPermission();
        setInterval(async () => {
            await props.getCurrentLocation();
        }, 15000)
        if (isEnabled) {
            //const socket = socketIO('https://takearideapp.herokuapp.com');
            const socket = socketIO('http://192.168.1.7:8082/');
            socket.open()
            socket.on("connect", () => {
                console.log("socket.id", socket.id);
                var driverCurrentData = {
                    "socketId": socket.id,
                    "locationId": "5eb1959850caeb3b977c1669"
                };
                props.updateLocationId(driverCurrentData)
                var driverRequest = socket.id + "driverRequest";
                console.log("driverRequest", driverRequest);
                socket.on(driverRequest, function (passengerData) {
                    if (passengerData) {
                        console.log("passengerData", passengerData)
                        //passengers=passengerData
                        setPassengers(passengerData)
                        //setPassengers(prevState => [...prevState, passengerData])
                    }
                })
            });
        }
    }, [])

    useEffect(() => {
        if (!props.current_location_loading) {
            console.log("current_location::", props.current_location)
            let data = {
                "locationId": "5eb1959850caeb3b977c1669",
                "latitude": props.current_location['latitude'],
                "longitude": props.current_location['longitude']
            }
            setInterval(async () => {
                props.updateCurrentDriverLocation(data)
            }, 30000)

        }
    }, [props.current_location_loading])

    useEffect(() => {
        if (!props.confirm_booking_loading) {
            if (!props.confirm_booking.toJS().error) {
                console.log("hehehehe", props.confirm_booking.toJS().data)
                props.navigation.navigate('MapView', { bookingData: props.confirm_booking.toJS().data })
                setShowBottomSheet(false)
            } else {
                Alert.alert("Error", "Failed to confirm the booking")
            }
        }

    }, [props.confirm_booking_loading])

    const clickEventListener = (item) => {
        setSelectedItem(item)
        setShowBottomSheet(true)
    }

    function onCloseHandler() {
        setShowBottomSheet(false)
    }
    function confirmationHandler(value) {
        if (value === 'confirm') {
            var dataToSend = {
                "driverId": "5eb1958550caeb3b977c13b1",
                "id": selectedItem._id,
                "status": 'confirmed',
            };
            props.confirmBooking(dataToSend)
        } else {
            setShowBottomSheet(false)
        }
    }

    const renderModalContent = () => {
        return (<Confirmation onCloseHandler={onCloseHandler} data={selectedItem} confirmationHandler={confirmationHandler} />)
    }
    return (
        < View style={styles.container} >
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {/* <Text>{passengers[0]}</Text> */}
            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={passengers}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.card} >
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.userName}</Text>
                                <Text>
                                    Pick-Up Address: {item.pickUp.address}{'\n'}
                                    Pick-Up Name: {item.pickUp.name}{'\n'}

                                    dropOff Address: {item.dropOff.address}{'\n'}
                                    dropOff Name: {item.dropOff.name}{'\n'}
                                </Text>
                                <Text style={styles.count}>Fare: {item.fare}</Text>
                                <TouchableOpacity style={styles.followButton} onPress={() => clickEventListener(item)}>
                                    <Text style={styles.followButtonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            <Modal
                isVisible={showBottomSheet}
                style={styles.bottomModal}
            //onBackdropPress={onCloseHandler}
            // set timeout due to iOS needing to make sure modal is closed
            // before presenting another view                
            >
                <View style={styles.modalContent}>
                    {renderModalContent()}
                </View>
            </Modal>

        </View >
    )

}

const mapStateToProps = (state) => {
    return {
        confirm_booking_loading: state.PassengersReducer.getIn(['confirm_booking', 'loading'], true),
        confirm_booking: state.PassengersReducer.getIn(['confirm_booking'], new Map()),
        current_location_loading: state.PassengersReducer.getIn(['current_geo_location', 'loading'], true),
        current_location: state.PassengersReducer.getIn(['current_geo_location', 'data'], new Map())
    }
}


export default connect(mapStateToProps, {
    updateLocationId, confirmBooking, updateCurrentDriverLocation,
    getCurrentLocation
})(Passengers)


const styles = StyleSheet.create({
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#6666ff"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: '#78CCC5',
        flex: 1,
    },
    description: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center',
    },
    modalContent: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 0,
        flexShrink: 1,
        justifyContent: 'flex-start',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
    },
});