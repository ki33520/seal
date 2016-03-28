'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import FlashBuy from "./component.jsx";
import * as actions from "./action.es6";

let FlashBuyConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(FlashBuy,actions));

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

class NavbarApp extends React.Component{
    render(){
        const {groupGoods,isFetched} = this.props.initialState;
        var store = configureStore({
            flashBuy:{
                isFetching:false,
                isFetched,
                groupGoods
            }
        });
        return (
            <Provider store={store}>
            <FlashBuyConnected />
            </Provider>
        )
    }
}

export default NavbarApp;