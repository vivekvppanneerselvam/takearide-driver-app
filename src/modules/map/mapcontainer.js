import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import MapViewDirections from 'react-native-maps-directions';
import { getCurrentLocation } from '../passengers/action'
import { Map } from 'immutable'

const MapContainer = (props) => {
    const bookingData = props.bookingData || {}   

    
console.log("props.currLoc", props.currLoc)

   

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={props.currLoc} >
                 {bookingData &&
                    <Marker
                        coordinate={{ latitude: parseFloat(bookingData['pickUp'].latitude), longitude: parseFloat(bookingData['pickUp'].longitude) }}
                        pinColor="blue"
                    />
                }
                 {(bookingData && props.isTripStart) &&
                    <Marker
                        coordinate={{ latitude: parseFloat(bookingData['dropOff'].latitude), longitude: parseFloat(bookingData['dropOff'].latitude) }}
                        pinColor="green"
                    />
                }

                {props.currLoc &&
                    <Marker                        
                        coordinate={{ latitude: props.currLoc['latitude'], longitude: props.currLoc['longitude'] }}
                        image={props.carMarker}
                    />

                }
                {(bookingData && props.currLoc && !props.isTripStart) && <MapViewDirections
                    origin={{ latitude: props.currLoc['latitude'], longitude: props.currLoc['longitude'] }}
                    destination={{ latitude: parseFloat(bookingData['pickUp'].latitude), longitude: parseFloat(bookingData['pickUp'].longitude) }}
                    apikey={''}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
                }
               {(bookingData && props.isTripStart) && <MapViewDirections
                    origin={{ latitude: props.currLoc['latitude'], longitude: props.currLoc['longitude'] }}
                    destination={{ latitude: parseFloat(bookingData['dropOff'].latitude), longitude: parseFloat(bookingData['dropOff'].longitude) }}
                    apikey={''}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
                }  
                {/*used to drae line on rout point of locations*/}
                {/*  {(selectedPickUp && selectedDropOff) && < MapView.Polyline
                    coordinates={state.coords}
                    strokeWidth={2}
                />} */}
            </MapView>
        </View >
    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps, { getCurrentLocation })(MapContainer);


const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
}