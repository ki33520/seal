'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import Cart from "./component.jsx";

function selector(state){
    const {cartByUser} = state;
    return {
        cartByUser
    };
}

let CartConnected = connect(selector)(Cart);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class CartApp extends Component{
    render(){
        const {cart} = this.props.initialState;
        const initialState = {
            cartByUser:{
                cart
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