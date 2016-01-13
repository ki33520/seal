
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Coupon from "./component.jsx";

function selector(state){
    const {pagination,couponType,isFetching} = state.couponByUser
    return {
        pagination,
        couponType,
        isFetching
    };
}

let CouponConnected = connect(selector)(Coupon);

function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState)
}

class CouponApp extends Component{
    render(){
         
        const {pagination,couponType,isFetching} = this.props.initialState;

        const initialState = {
            couponByUser:{
                pagination,
                couponType,
                isFetching
            }
        };
        let store = configureStore(initialState);
        return (
            <Provider store={store}>
                <CouponConnected />
            </Provider>
        )
    }
}

export default CouponApp;