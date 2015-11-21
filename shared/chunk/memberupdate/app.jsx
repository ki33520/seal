'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import MemberUpdate from "./component.jsx";

function selector(state){
    const {memberInfoByUser} = state;
    return {
        memberInfoByUser
    };
}

let MemberUpdateConnected = connect(selector)(MemberUpdate);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MemberupdateApp extends Component{
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
                <MemberUpdateConnected />
            </Provider>
        )
    }
}

export default MemberupdateApp;