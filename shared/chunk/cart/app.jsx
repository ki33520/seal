'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Cart from "./component.jsx";
import * as actions from "./action.es6";

let CartConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Cart,actions));

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

class CartApp extends Component{
    render(){
        const {carts,loginUrl,isLogined} = this.props.initialState;
        const initialState = {
            cartByUser:{
                isFetching:false,
                carts,
                isLogined,
                loginUrl
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <CartConnected />
            </Provider>
        )
    }
}

export default CartApp;