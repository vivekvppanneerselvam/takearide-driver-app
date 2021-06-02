import { fromJS } from 'immutable'
let initialState = fromJS({ forgotpwd_loading: false });
function ForgotPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case 'FORGOT_PWD_LOADING':
            return { ...state, forgotpwd_loading: true }
        case 'FORGOT_PWD':
            return { ...state, forgotpwd_loading: false, }
        case 'FORGOT_PWD_ERROR':
            return { ...state, forgotpwd_loading: false, error: action.payload.error.response.data }
        case 'REQ_PWD_CHANGE_LOADING':
            return state.setIn(['req_pwd_change', 'loading'], action.loading)
                .setIn(['req_pwd_change', 'error'], action.error)
        case 'REQ_PWD_CHANGE':
            return state.setIn(['req_pwd_change', 'data'], action.data)
                .setIn(['req_pwd_change', 'loading'], action.loading)
                .setIn(['req_pwd_change', 'error'], action.error)
        case 'REQ_PWD_CHANGE_ERROR':
            return state.setIn(['req_pwd_change', 'data'], action.data)
                .setIn(['req_pwd_change', 'loading'], action.loading)
                .setIn(['req_pwd_change', 'error'], action.error)

        case 'CHECK_RESET_TOKEN_LOADING':
            return state.setIn(['check_reset_token', 'loading'], action.loading)
                .setIn(['check_reset_token', 'error'], action.error)
        case 'CHECK_RESET_TOKEN':
            return state.setIn(['check_reset_token', 'data'], action.data)
                .setIn(['check_reset_token', 'loading'], action.loading)
                .setIn(['check_reset_token', 'error'], action.error)
        case 'CHECK_RESET_TOKEN_ERROR':
            return state.setIn(['check_reset_token', 'data'], action.data)
                .setIn(['check_reset_token', 'loading'], action.loading)
                .setIn(['check_reset_token', 'error'], action.error)

        case 'RESET_PASSWORD_LOADING':
            return state.setIn(['reset_password', 'loading'], action.loading)
                .setIn(['reset_password', 'error'], action.error)
        case 'RESET_PASSWORD':
            return state.setIn(['reset_password', 'data'], action.data)
                .setIn(['reset_password', 'loading'], action.loading)
                .setIn(['reset_password', 'error'], action.error)
        case 'RESET_PASSWORD_ERROR':
            return state.setIn(['reset_password', 'data'], action.data)
                .setIn(['reset_password', 'loading'], action.loading)
                .setIn(['reset_password', 'error'], action.error)

        default:
            return state
    }
}

export default ForgotPasswordReducer