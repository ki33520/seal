'use strict';
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import ConfirmOrder from "./component.jsx";
import * as actions from "./action.es6";

let ConfirmOrderConnected = connect((state)=>{
    return {...state.orderByParam};
})(wrapComponentWithActions(ConfirmOrder,actions));

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

class ConfirmOrderApp extends Component{
    render(){
        const {isFetched,order} = this.props.initialState;
        var store = configureStore({
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