'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import MembercollectList from "./component.jsx";

function selector(state){
    const {collect,isFetched,isFetching} = state.memberCollectByUser;
    return {
        collect,
        isFetched,
        isFetching
    };
}

let MembercollectListConnected = connect(selector)(MembercollectList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class MembercollectApp extends Component{
    render(){
        const {collect,isFetched} = this.props.initialState;
        const initialState = {
            memberCollectByUser:{
                isFetching:false,
                isFetched,
                collect
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <MembercollectListConnected />
            </Provider>
        )
    }
}

export default MembercollectApp;