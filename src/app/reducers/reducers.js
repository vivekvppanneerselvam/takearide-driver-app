import { combineReducers } from 'redux'
import LoginReducer from "../../modules/login/reducer";
import PassengersReducer from '../../modules/passengers/reducer'
import ForgetPasswordReducer from '../../modules/forgotpassword/reducer'
import RegisterReducer from '../../modules/register/reducer'
import MapReducer from '../../modules/map/reducer'
export const rootReducer = combineReducers({
    LoginReducer,
    ForgetPasswordReducer,
    RegisterReducer,
    PassengersReducer,
    MapReducer
})