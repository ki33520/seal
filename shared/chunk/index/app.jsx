'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Index from "./component.jsx";
import * as actions from "./action.es6";

let IndexConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Index,actions));

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
        module.hot.accept('./reducer.es6', () => {
            const nextRootReducer = require('./reducer.es6');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store
}

class IndexApp extends React.Component{
    render(){
        const {channels,floors,currentChannel} = this.props.initialState;
        var store = configureStore({
            index:{
                channels,
                floors,
                currentChannel
            }
        });
        return (
            <Provider store={store}>
            <IndexConnected />
            </Provider>
        )
    }
}

export default IndexApp;