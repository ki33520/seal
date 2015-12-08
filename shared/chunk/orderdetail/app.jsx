'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import OrderDetail from "./component.jsx";

function selector(state){
    const {order,logistics,isFetched,isFetching} = state.orderByParam
    return {
        order,
        logistics,
        isFetched,
        isFetching
    };
}

let OrderDetailConnected = connect(selector)(OrderDetail);

class OrderDetailApp extends React.Component{
    render(){
        const {isFetched,order} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            orderByParam:{
                isFetching:false,
                isFetched,
                order
            }
        });
        return (
            <Provider store={store}>
            {()=><OrderDetailConnected />}
            </Provider>
        )
    }
}

export default OrderDetailApp;