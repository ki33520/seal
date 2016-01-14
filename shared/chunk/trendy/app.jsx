
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Trendy from "./component.jsx";

function selector(state){
    const {category,goodList,totalPages,pageIndexs,isFetching} = state.goodsByParam
    return {
        isFetching,
        goodList,
        pageIndexs,
        totalPages,
        category
    };
}

let TrendyConnected = connect(selector)(Trendy);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class TrendyApp extends Component{
    render(){
        const {category,goodList,totalPages,pageIndexs} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                goodList,
                totalPages,
                pageIndexs,
                category
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <TrendyConnected />
            </Provider>
        )
    }
}

export default TrendyApp;