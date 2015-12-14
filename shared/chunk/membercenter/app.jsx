'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import MemberCenter from "./component.jsx";

function selector(state){
    const {member,api,isLogined,isFetched,isFetching} = state.memberCenterByUser;
    return {
        member,api,isLogined,isFetched,isFetching
    };
}

let MemberCenterConnected = connect(selector)(MemberCenter);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MembercenterApp extends Component{
    render(){
        const {isFetched,member,isLogined,api} = this.props.initialState;
        const initialState = {
            memberCenterByUser:{
                isFetching:false,
                isFetched,
                member,
                isLogined,
                api
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