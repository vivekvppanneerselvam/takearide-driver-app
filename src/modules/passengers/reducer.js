import { fromJS } from 'immutable'
let initialState = fromJS({});
export default function PassengersReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SOCKET_ID_LOADING':
            return state.setIn(['update_socket_id', 'loading'], action.loading)
                .setIn(['update_socket_id', 'error'], false)
        case 'UPDATE_SOCKET_ID_SUCCESS':
            return state.setIn(['update_socket_id', 'data'], action.data)
                .setIn(['update_socket_id', 'loading'], action.loading)
                .setIn(['update_socket_id', 'error'], false)
        case 'UPDATE_SOCKET_ID_FAILURE':
            return state.setIn(['update_socket_id', 'data'], action.data)
                .setIn(['update_socket_id', 'loading'], action.loading)
                .setIn(['update_socket_id', 'error'], action.error)
        case 'CONFIRM_BOOKING_LOADING':
            return state.setIn(['confirm_booking', 'loading'], action.loading)
                .setIn(['confirm_booking', 'error'], action.error)
        case 'CONFIRM_BOOKING_SUCCESS':
            return state.setIn(['confirm_booking', 'data'], action.data)
                .setIn(['confirm_booking', 'loading'], action.loading)
                .setIn(['confirm_booking', 'error'], action.error)
        case 'CONFIRM_BOOKING_FAILURE':
            return state.setIn(['confirm_booking', 'loading'], action.loading)
                .setIn(['confirm_booking', 'error'], action.error)

        case 'UPDATE_CURNT_LOC_LOADING':
            return state.setIn(['update_curnt_loc', 'loading'], action.loading)
                .setIn(['update_curnt_loc', 'error'], false)
        case 'UPDATE_CURNT_LOC':
            return state.setIn(['update_curnt_loc', 'data'], action.data)
                .setIn(['update_curnt_loc', 'loading'], action.loading)
                .setIn(['update_curnt_loc', 'error'], false)
        case 'UPDATE_CURNT_LOC_ERROR':
            return state.setIn(['update_curnt_loc', 'data'], action.data)
                .setIn(['update_curnt_loc', 'loading'], action.loading)
                .setIn(['update_curnt_loc', 'error'], action.error)
        case 'GET_CURRENT_LOCATION_LOADING':
            state.setIn(['current_geo_location', 'loading'], action.loading)
        case 'GET_CURRENT_LOCATION':
            return state.setIn(['current_geo_location', 'loading'], action.loading)
                .setIn(['current_geo_location', 'data'], action.payload)
        default:
            return state
    }

}