
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Trendy from "./component.jsx";
import * as actions from "./action.es6";

let TrendyConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Trendy,actions));

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

class TrendyApp extends Component{
    render(){
        const {categories} = this.props.initialState;
        const initialState = {
            trendy:{
                categories
            },
            search:{
                keyword:''
            }
        };
        const store = configureStore(initialState);
        return (
            <Provider store={store}>
            <TrendyConnected />
            </Provider>
        )
    }
}

export default TrendyApp;