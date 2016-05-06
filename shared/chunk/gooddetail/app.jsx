'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import GoodDetail from "./component.jsx";
import * as actions from "./action.es6";

let GoodDetailConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(GoodDetail,actions));

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

class GoodDetailApp extends Component{
    render(){
        const {good,cartCount,isAuthorized,loginUrl,weixinConfig} = this.props.initialState;
        const initialState = {
            goodById:{
                isAuthorized,loginUrl,weixinConfig,
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