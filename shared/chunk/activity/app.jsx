
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Activity from "./component.jsx";

function selector(state){
    const {isFetched,isFetching,list,imageUrl,title,totalPage} = state.goodsByParam
    return {
        isFetched,
        list,
        title,
        imageUrl,
        totalPage,
        isFetching
    };
}

let ActivityConnected = connect(selector)(Activity);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class ActivityApp extends Component{
    render(){
        const {list,imageUrl,title,totalPage,isFetched} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetched,
                list,
                imageUrl,
                title,
                totalPage,
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