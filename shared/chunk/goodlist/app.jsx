
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";

function selector(state){
    const {goodsList,areaNames,brandNames,categorys,keyword,hotwords,isFetching} = state.goodsByParam
    return {
        isFetching,
        goodsList,
        areaNames,
        brandNames,
        categorys,
        hotwords,
        keyword
    };
}

let GoodListConnected = connect(selector)(GoodList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodListApp extends Component{
    render(){
        const {goodsList,areaNames,brandNames,categorys,keyword} = this.props.initialState;
        const initialState = {
            goodsByParam:{
                isFetching:false,
                goodsList,
                areaNames,
                brandNames,
                categorys,
                keyword
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