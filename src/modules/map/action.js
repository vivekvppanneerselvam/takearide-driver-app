
import serverCall from '../../serverCall'

export const updateTripStarted = (bookingId, data ) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_TRIP_START_LOADING', data: '', loading: true, error: false })
        return serverCall({ method: 'PUT', url: '/api/trip/' + bookingId, data: data })
            .then((res) => {
                console.log(res)
                dispatch({ type: 'UPDATE_TRIP_START_SUCCESS', data: 'success', loading: false, error: false })
            }).catch((err) => {
                console.log(err)
                dispatch({ type: 'UPDATE_TRIP_START_FAILURE', data: 'failure', loading: false, error: true })
            })
    }
}

export const updateTripCompleted = (booking_data) => {
    return (dispatch) => {
        dispatch({ type: 'TRIP_COMPLETE_LOADING', data: '', loading: true, error: false })
        return serverCall({ method: 'PUT', url: '/api/trip', data: booking_data }).then((res) => {
            console.log(res)
            dispatch({ type: 'TRIP_COMPLETE_SUCCESS', data: 'success', loading: false, error: false })
        }).catch((err) => {
            console.log(err)
            dispatch({ type: 'TRIP_COMPLETE_FAILURE', data: 'failure', loading: false, error: true })
        })
    }
}


export function getRoutePoints(origin, destination) {
	console.log("-----getRoutePoints-----")
	var routeUrl = "https://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=" + origin + "&wp.1=" + destination + "&key=" + bingMapsKey
	console.log("URL -- >>" + routeUrl);
	return (dispatch, store) => {
		//dispatch({ type: ROUTE_POINTS_LOADING, loading: true })
		axios.get(routeUrl)			
			.then((res) => {
				console.log("hahaha", res.data)
				//var cortemp = decode(responseJson.routes[0].overview_polyline.points) // definition below;
				var cortemp = routesDecode(res)
				var length = cortemp.length - 1;
				var tempMARKERS = [];
				tempMARKERS.push(cortemp[0]);   //start origin        
				tempMARKERS.push(cortemp[length]); //only destination adding
				console.log("tempMARKERS : " + JSON.stringify(tempMARKERS));
				let obj = {
					coords: cortemp,
					MARKERS: tempMARKERS,
					destMarker: cortemp[length],
					startMarker: cortemp[0],

				}
				dispatch({ type: 'ROUTE_POINTS', data: obj, loading: false });
			}).catch(err=>{
				console.log(err)
			})
	}
}