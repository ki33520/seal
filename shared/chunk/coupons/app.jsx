
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Coupons from "./component.jsx";

function selector(state){
    const {pagination,isFetched,isFetching,title} = state.goodsByParam
    return {
        pagination,
        isFetched,
        title,
        isFetching
    };
}

let CouponsConnected = connect(selector)(Coupons);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class CouponsApp extends Component{
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
            <CouponsConnected />
            </Provider>
        )
    }
}

export default CouponsApp;