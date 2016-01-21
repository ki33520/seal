
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {searchParams,totalPage,filters,goods,hotwords,associatewords,isFetching,hotwordFetched} = state.goodsByParam
    return {
        isFetching,
        searchParams,
        totalPage,
        filters,
        goods,
        hotwordFetched,
        associatewords,
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
        const {searchParams,totalPage,filters,goods} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                searchParams,
                totalPage,
                filters,
                goods
            }
        };
        let store = configureStore(initialState);
        return (
            <Provider store={store}>
            <GoodListConnected />
            </Provider>
        )
    }
}

export default GoodListApp;