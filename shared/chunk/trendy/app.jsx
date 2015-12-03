
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Trendy from "./component.jsx";

function selector(state){
    const {pagination,isFetched,isFetching,title} = state.goodsByParam
    return {
        pagination,
        isFetched,
        title,
        isFetching
    };
}

let TrendyConnected = connect(selector)(Trendy);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class TrendyApp extends Component{
    render(){
        const {isFetched,pagination,title} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                isFetched,
                title,
                pagination
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <TrendyConnected />
            </Provider>
        )
    }
}

export default TrendyApp;