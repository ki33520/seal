'use strict';
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import ConfirmOrder from "./component.jsx";

function selector(state){
    const {order,
        isFetched,isFetching,orderSubmited,orderSubmiting,result,errMsg,alertActive,alertContent} = state.orderByParam
    return {
        order,
        orderSubmited,
        result,
        orderSubmiting,
        alertActive,
        alertContent,
        errMsg,
        isFetched,
        isFetching
    };
}

let ConfirmOrderConnected = connect(selector)(ConfirmOrder);

class ConfirmOrderApp extends Component{
    render(){
        const {isFetched,order} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            orderByParam:{
                isFetching:false,
                isFetched,
                order:Object.assign({},order,{
                    checkedDeliveryTime:"NOLIMIT",
                    useTicket:false,
                    useBalance:false,
                    payPassword:""
                })
            }
        });
        return (
            <Provider store={store}>
            <ConfirmOrderConnected />
            </Provider>
        )
    }
}

export default ConfirmOrderApp;