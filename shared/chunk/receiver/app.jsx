'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Receiver from "./component.jsx";
import * as actions from "./action.es6";

let ReceiverConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Receiver,actions));

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

class ReceiverApp extends React.Component{
    render(){
        const {receivers,onCheck,checkedReceiver} = this.props.initialState;
        var store = configureStore({
            receiverByUser:{
                isFetching:false,
                onCheck,
                checkedReceiver,
                receivers
            },
            receiverByForm:{
                receiver:null,
                provinces:[{
                    value: "",
                    label: "请选择"
                }],
                cities: [{
                    value: "",
                    label: "请选择"
                }],
                districts: [{
                    value: "",
                    label: "请选择"
                }]
            }
        });
        return (
            <Provider store={store}>
            <ReceiverConnected />
            </Provider>
        )
    }
}

export default ReceiverApp;