
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {pagination,isFetching,keywords} = state.goodsByParam
    return {
        isFetching,
        pagination,
        keywords
    };
}

let GoodListConnected = connect(selector)(GoodList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodListApp extends Component{
    render(){
        const {pagination,keywords,isFetching} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching,
                pagination,
                keywords
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