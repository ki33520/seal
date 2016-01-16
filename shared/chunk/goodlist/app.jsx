
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {queryParams,totalPage,filters,goods,hotwords,isFetching} = state.goodsByParam
    return {
        isFetching,
        queryParams,
        totalPage,
        filters,
        goods,
        hotwords
    };
}

let GoodListConnected = connect(selector)(GoodList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodListApp extends Component{
    render(){
        const {queryParams,totalPage,filters,goods} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                queryParams,
                totalPage,
                filters,
                goods
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <GoodListConnected />
            </Provider>
        )
    }
}

export default GoodListApp;