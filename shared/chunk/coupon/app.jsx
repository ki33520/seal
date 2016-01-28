
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Coupon from "./component.jsx";
import * as actions from "./action.es6";

let CouponConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Coupon,actions));

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
        module.hot.accept('./reducer.es6', () => {
            const nextRootReducer = require('./reducer.es6');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store
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