
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import Coupon from "./component.jsx";

function selector(state){
    const {enableCoupons,legueCoupons,invalidCoupons,isFetching} = state.receiverByUser
    return {
        enableCoupons,
        legueCoupons,
        invalidCoupons,
        isFetching
    };
}

let CouponConnected = connect(selector)(Coupon);

function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState)
}

class CouponApp extends Component{
    render(){
         
        const {enableCoupons,legueCoupons,invalidCoupons} = this.props.initialState;
        const initialState = {
            receiverByUser:{
                isFetching:false,
                enableCoupons,
                legueCoupons,
                invalidCoupons
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