'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderList from "./component.jsx";

function selector(state){
    const {orders,systemTime,flag,isFetched,isFetching} = state.ordersByParam
    return {
        orders,
        flag,
        systemTime,
        isFetched,
        isFetching
    };
}

let CommentListConnected = connect(selector)(OrderList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class OrderListApp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {isFetched,orders,flag,systemTime} = this.props.initialState;
        const initialState = {
            ordersByParam:{
                isFetching:false,
                isFetched,
                flag,
                orders,
                systemTime
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <CommentListConnected />
            </Provider>
        )
    }
}

export default OrderListApp;