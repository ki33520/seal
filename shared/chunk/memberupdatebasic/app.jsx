'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import MemberUpdateBasic from "./component.jsx";

function selector(state){
    const {memberInfoByUser} = state;
    return {
        memberInfoByUser
    };
}

let MemberUpdateBasicConnected = connect(selector)(MemberUpdateBasic);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MemberupdatebasicApp extends Component{
    render(){
        const {memberInfo} = this.props.initialState;
        const initialState = {
            memberInfoByUser:{
                memberInfo
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <MemberUpdateBasicConnected />
            </Provider>
        )
    }
}

export default MemberupdatebasicApp;