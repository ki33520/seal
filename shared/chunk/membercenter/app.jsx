'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import MemberCenter from "./component.jsx";

function selector(state){
    const {memberCenterByUser} = state;
    return {
        memberCenterByUser
    };
}

let MemberCenterConnected = connect(selector)(MemberCenter);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MembercenterApp extends Component{
    render(){
        const {member,login} = this.props.initialState;
        const initialState = {
            memberCenterByUser:{
                member,
                login
            }
        };
        
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <MemberCenterConnected />
            </Provider>
        )
    }
}

export default MembercenterApp;