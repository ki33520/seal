
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Activity from "./component.jsx";

function selector(state){
    const {isFetched,isFetching,activityList,imageUrl,activityName,totalPage,weixinConfig} = state.goodsByParam
    return {
        isFetched,
        activityList,
        activityName,
        imageUrl,
        totalPage,
        isFetching,
        weixinConfig
    };
}

let ActivityConnected = connect(selector)(Activity);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class ActivityApp extends Component{
    render(){
        const {activityList,imageUrl,activityName,totalPage,isFetched,weixinConfig} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetched,
                activityList,
                imageUrl,
                activityName,
                totalPage,
                weixinConfig,
                isFetching:false
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <ActivityConnected />
            </Provider>
        )
    }
}

export default ActivityApp;