'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderList from "./component.jsx";

function selector(state){
    const {orders,isFetched,isFetching} = state.ordersByParam
    return {
        orders,
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
        const {isFetched,orders} = this.props.initialState;
        const initialState = {
            ordersByParam:{
                isFetching:false,
                isFetched,
                orders
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