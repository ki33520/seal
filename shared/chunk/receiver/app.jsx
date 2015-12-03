'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Receiver from "./component.jsx";

function selector(state){
    const {receiverByForm,receiverByUser} = state;
    return {
        receiverByForm,
        receiverByUser
    };
}

let ReceiverConnected = connect(selector)(Receiver);

class ReceiverApp extends React.Component{
    render(){
        const {receivers,onCheck,checkedReceiver} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
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