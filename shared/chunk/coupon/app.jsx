
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Coupon from "./component.jsx";

function selector(state){
    const {youaCoupons,legueCoupons,invalidCoupons,isFetching} = state.couponByUser
    return {
        youaCoupons,
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
         
        const {pagination,isFetching} = this.props.initialState;

        const initialState = {
            couponByUser:{
                youaCoupons:pagination,
                legueCoupons:{},
                invalidCoupons:{}
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