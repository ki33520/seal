'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderDetail from "./component.jsx";

function selector(state){
    const {order,systemTime,logistics,isFetched,isFetching} = state.orderByParam
    return {
        order,
        systemTime,
        logistics,
        isFetched,
        isFetching
    };
}

let OrderDetailConnected = connect(selector)(OrderDetail);

class OrderDetailApp extends React.Component{
    render(){
        const {isFetched,order,systemTime} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            orderByParam:{
                isFetching:false,
                isFetched,
                order,
                systemTime
            }
        });
        return (
            <Provider store={store}>
            <OrderDetailConnected />
            </Provider>
        )
    }
}

export default OrderDetailApp;