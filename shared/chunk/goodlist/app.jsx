
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {pagination,isFetched,isFetching,keywords} = state.goodsByParam
    return {
        pagination,
        isFetched,
        keywords,
        isFetching
    };
}

let GoodListConnected = connect(selector)(GoodList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodListApp extends Component{
    render(){
        const {isFetched,pagination,keywords} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                isFetched,
                keywords,
                pagination
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