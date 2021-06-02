import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
let socket = io("http://192.168.1.5:8080",);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
import { rootReducer } from '../app/reducers/reducers'


// a function which can create our store and auto-persist the data
export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    //const middleware = [thunk, socketIoMiddleware];
    const middleware = [thunk];
    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];

    // ======================================================
    // Store Instantiation
    // ======================================================
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    return store;
};