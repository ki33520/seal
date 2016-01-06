'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Index from "./component.jsx";
import * as actions from "./action.es6";

let IndexConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Index,actions));

class IndexApp extends React.Component{
    render(){
        const {channels,floors} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            index:{
                channels,
                floors
            }
        });
        return (
            <Provider store={store}>
            <IndexConnected />
            </Provider>
        )
    }
}

export default IndexApp;