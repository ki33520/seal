'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import MembercollectList from "./component.jsx";
import * as actions from "./action.es6";

let ReceiverConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(MembercollectList,actions));

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
            <ReceiverConnected />
            </Provider>
        )
    }
}

export default MembercollectApp;