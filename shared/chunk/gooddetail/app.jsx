'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import GoodDetail from "./component.jsx";

function selector(state){
    const {goodById,cartByUser} = state;
    return {
        goodById,
        cartByUser
    };
}

let GoodDetailConnected = connect(selector)(GoodDetail);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class GoodDetailApp extends Component{
    render(){
        const {good,cartCount} = this.props.initialState;
        const initialState = {
            goodById:{
                good
            },
            cartByUser:{
                cartCount
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <GoodDetailConnected />
            </Provider>
        )
    }
}

export default GoodDetailApp;