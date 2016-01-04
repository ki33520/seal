'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Navigate from "./component.jsx";

function selector(state){
    const {navigate,isFetching} = state.goodsByParam;
    return {
        navigate,
        isFetching
    };
}

let NavigateConnected = connect(selector)(Navigate);

class NavigateApp extends React.Component{
    render(){
        const {navigate} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodsByParam:{
                isFetching:false,
                navigate
            }
        });
        return (
            <Provider store={store}>
            <NavigateConnected />
            </Provider>
        )
    }
}

export default NavigateApp;