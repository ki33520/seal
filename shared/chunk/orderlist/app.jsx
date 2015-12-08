'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderList from "./component.jsx";

function selector(state){
    const {pagination,isFetched,isFetching} = state.ordersByParam
    return {
        pagination,
        isFetched,
        isFetching
    };
}

let OrderListConnected = connect(selector)(OrderList);

class OrderListApp extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {isFetched,pagination} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            ordersByParam:{
                isFetching:false,
                isFetched,
                pagination
            }
        });
        return (
            <Provider store={store}>
            {()=><OrderListConnected />}
            </Provider>
        )
    }
}

export default OrderListApp;