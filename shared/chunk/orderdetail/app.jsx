'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderDetail from "./component.jsx";

function selector(state){
    //const {isFetching,isFetched,logistics,order,systemTime,msg,closeOrderChanged,closeOrderChanging,alertActive,alertContent} = state.orderByParam;
    return state.orderByParam;
}

let OrderDetailConnected = connect(selector)(OrderDetail);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class OrderDetailApp extends React.Component{
    render(){
        const {isFetched,order,systemTime} = this.props.initialState;
        const initialState = {
            orderByParam:{
                isFetching:false,
                isFetched,
                order,
                systemTime
            }
        }
        var store = configureStore(initialState);

        return (
            <Provider store={store}>
            <OrderDetailConnected />
            </Provider>
        )
    }
}

export default OrderDetailApp;