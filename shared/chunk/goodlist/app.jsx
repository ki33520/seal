
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {goods,sideBar,total,pageIndex,params,hotwords,isFetching} = state.goodsByParam
    return {
        isFetching,
        params,
        goods,
        sideBar,
        total,
        pageIndex
    };
}

let GoodListConnected = connect(selector)(GoodList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodListApp extends Component{
    render(){
        const {goods,sideBar,total,pageIndex,params} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                params,
                goods,
                sideBar,
                total,
                pageIndex
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