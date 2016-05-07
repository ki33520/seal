'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Topic from "./component.jsx";

function selector(state){
    const {isFetching,list,imageUrl,title,totalPage} = state.goodsByParam
    return {
        list,
        title,
        imageUrl,
        totalPage,
        isFetching
    };
}

let TopicConnected = connect(selector)(Topic);

class TopicApp extends React.Component{
    render(){
        const {list,imageUrl,title,totalPage,weixinConfig} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodsByParam:{
                list,
                imageUrl,
                title,
                totalPage,
                weixinConfig,
                isFetching:false
            }
        });
        return (
            <Provider store={store}>
            <TopicConnected />
            </Provider>
        )
    }
}

export default TopicApp;