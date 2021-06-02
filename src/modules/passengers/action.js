import serverCall from '../../serverCall'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'TakeARideDriverApp',
                'message': 'TakeARideDriverApp access to your location '
            }
        )
        console.log("hahahhah::", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            getCurrentLocation()
        } else {
            console.log("Location permission denied")
            alert("Location permission denied");
        }
    } catch (err) {
        console.warn(err)
    }
}

export function getCurrentLocation() {
    return (dispatch) => {
        dispatch({ type: 'GET_CURRENT_LOCATION_LOADING', loading: true });
        var options = { timeout: 60000 };
        Geolocation.getCurrentPosition((position) => {
            var data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
           return  dispatch({ type: 'GET_CURRENT_LOCATION', payload: data, loading: false });
        }, ()=>{
            if (err.code == 1) {                
                console.log("Error: Access is denied!");
            } else if (err.code == 2) {
                console.log("Error: Position is unavailable!");
            }
            dispatch({ type: 'GET_CURRENT_LOCATION', loading: false });
        }, options);

    }
}

function showLocation(position) {
    console.log("position", position)
    var data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
    }
    /* return (dispatch) => { */
        dispatch({ type: 'GET_CURRENT_LOCATION', payload: data, loading: false });
    /* } */
}

function errorHandler(err) {
    if (err.code == 1) {
        console.log("Error: Access is denied!");
    } else if (err.code == 2) {
        console.log("Error: Position is unavailable!");
    }
}

export const updateLocationId = (driverCurrentData) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_SOCKET_ID_LOADING', data: '', loading: true, error: false })
        return serverCall({ method: 'PUT', url: '/api/driverLocationSocket/' + driverCurrentData.locationId, data: driverCurrentData })
            .then((res) => {
                //console.log(res)
                dispatch({ type: 'UPDATE_SOCKET_ID_SUCCESS', data: 'success', loading: false, error: false })
            }).catch((err) => {
                // console.log(err)
                dispatch({ type: 'UPDATE_SOCKET_ID_FAILURE', data: 'failure', loading: false, error: true })
            })
    }
}

export const updateCurrentDriverLocation = (driverCurrentData) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_CURNT_LOC_LOADING', data: '', loading: true })
        return serverCall({ method: 'PUT', url: '/api/driverLocation/' + driverCurrentData.locationId, data: driverCurrentData }).then((res) => {
            dispatch({ type: 'UPDATE_CURNT_LOC', data: res.data, loading: false, error: false })
        }).catch((err) => {
            dispatch({ type: 'UPDATE_CURNT_LOC_ERROR', data: '', loading: false, error: true })
        })
    }
}

export const confirmBooking = (booking_data) => {
    return (dispatch) => {
        dispatch({ type: 'CONFIRM_BOOKING_LOADING', data: '', loading: true, error: false })
        return serverCall({ method: 'PUT', url: '/api/bookings/' + booking_data.id, data: booking_data }).then((res) => {
            console.log("test hahahah:::::", res.data)
            dispatch({ type: 'CONFIRM_BOOKING_SUCCESS', data: res.data, loading: false, error: false })
        }).catch((err) => {
            console.log(err)
            dispatch({ type: 'CONFIRM_BOOKING_FAILURE', loading: false, error: true })
        })
    }
}