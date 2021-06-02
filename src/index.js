import React from 'react';
import { Provider } from 'react-redux'
import { Router } from "react-native-router-flux";
import App from './app/App';
import createStore from "./store/createstore";
const initialState = window.___INTITIAL_STATE__;
const store = createStore(initialState);
function Root(props) {
    return(
        <Provider store={store}>
            <Router scenes={App}> </Router>
        </Provider>
    )
}
export default Root