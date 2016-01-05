'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Category from "./component.jsx";

function selector(state){
    const {category,isFetching} = state.goodsByParam;
    return {
        category,
        isFetching
    };
}

let CategoryConnected = connect(selector)(Category);

class CategoryApp extends React.Component{
    render(){
        const {category} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodsByParam:{
                isFetching:false,
                category
            }
        });
        return (
            <Provider store={store}>
            <CategoryConnected />
            </Provider>
        )
    }
}

export default CategoryApp;