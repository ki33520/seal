'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import HelpList from "./component.jsx";

function selector(state){
    const {helpInfo} = state;
    return {
        helpInfo
    };
}

let HelpListConnected = connect(selector)(HelpList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class HelpApp extends Component{
    render(){
        const {helpInfo} = this.props.initialState;
        const initialState = {
            helpInfo
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
                <HelpListConnected />
            </Provider>
        )
    }
}

export default HelpApp;