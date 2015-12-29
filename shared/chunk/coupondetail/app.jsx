'use strict'
 
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";


import CouponDetailRouter from "./component.jsx";

function selector(state){
    const {coupon,isFetching} = state.couponById
    return {
        coupon,
        isFetching
    };
}

let CouponDetailConnected = connect(selector)(CouponDetailRouter);

function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState)
}

class CouponDetailApp extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {coupon} = this.props.initialState;
        const initialState = {
            couponById:{
                isFetching:false,
                coupon
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
                <CouponDetailConnected />
            </Provider>
        )
    }
}

export default CouponDetailApp;