'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import CollectList from "./component.jsx";

function selector(state){
    const {getCollect} = state;
    return {
        getCollect
    };
}

let CollectListConnected = connect(selector)(CollectList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class CollectApp extends Component{
    render(){
        const {collect} = this.props.initialState;
        const initialState = {
            getCollect:{
                collect
            }
        };
        console.log(this.props)
        var store = configureStore(initialState);
        console.log(store.getState())
        return (
            <Provider store={store}>
            <CollectListConnected />
            </Provider>
        )
    }
}

export default CollectApp;