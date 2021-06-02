import { fromJS } from 'immutable'
let initialState = fromJS({});
export default function MapReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_TRIP_START_LOADING':
            return state.setIn(['update_trip_start', 'loading'], action.loading)
                .setIn(['update_trip_start', 'error'], action.error)
        case 'UPDATE_TRIP_START_SUCCESS':
            return state.setIn(['update_trip_start', 'data'], action.data)
                .setIn(['update_trip_start', 'loading'], action.loading)
                .setIn(['update_trip_start', 'error'], action.error)
        case 'UPDATE_TRIP_START_FAILURE':
            return state.setIn(['update_trip_start', 'data'], action.data)
                .setIn(['update_trip_start', 'loading'], action.loading)
                .setIn(['update_trip_start', 'error'], action.error)
        case 'TRIP_COMPLETE_LOADING':
            return state.setIn(['trip_completed', 'loading'], action.loading)
                .setIn(['trip_completed', 'error'], action.error)
        case 'TRIP_COMPLETE_SUCCESS':
            return state.setIn(['trip_completed', 'data'], action.data)
                .setIn(['trip_completed', 'loading'], action.loading)
                .setIn(['trip_completed', 'error'], action.error)
        case 'TRIP_COMPLETE_FAILURE':
            return state.setIn(['trip_completed', 'data'], action.data)
                .setIn(['trip_completed', 'loading'], action.loading)
                .setIn(['trip_completed', 'error'], action.error)
        case 'ROUTE_POINTS':
            return state.setIn(['route_points', 'data'], action.data)
                .setIn(['route_points', 'loading'], action.loading)
        default:
            return state
    }

}