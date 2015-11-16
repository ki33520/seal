'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import MemberInfo from "./component.jsx";

function selector(state){
    const {memberInfo} = state;
    return {
        memberInfo
    };
}

let MemberInfoConnected = connect(selector)(MemberInfo);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MembercenterApp extends Component{
    render(){
        const {member,login} = this.props.initialState;
        const initialState = {
            memberInfo:{
                member,
                login
            }
        };
        
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <MemberInfoConnected />
            </Provider>
        )
    }
}

export default MembercenterApp;