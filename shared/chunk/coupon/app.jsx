
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Coupon from "./component.jsx";

function selector(state){
    const {enableCoupons,legueCoupons,invalidCoupons,
        enableIndex,invalidIndex,legueIndex} = state.couponByUser
    return {
        enableCoupons,
        legueCoupons,
        invalidCoupons,
        enableIndex,
        invalidIndex,
        legueIndex
    };
}

let CouponConnected = connect(selector)(Coupon);

function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState)
}

class CouponApp extends Component{
    render(){
         
        const {enableCoupons,legueCoupons,invalidCoupons,
            enableIndex,invalidIndex,legueIndex} = this.props.initialState;

        const initialState = {
            couponByUser:{
                enableCoupons,
                legueCoupons,
                invalidCoupons,
                enableIndex,
                invalidIndex,
                legueIndex
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
                <CouponConnected />
            </Provider>
        )
    }
}

export default CouponApp;