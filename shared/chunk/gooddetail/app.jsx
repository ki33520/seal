'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
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

class GoodDetailApp extends Component{
    render(){
        const {good,cartCount} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodById:{
                good
            },
            cartByUser:{
                cartCount
            }
        });
        return (
            <Provider store={store}>
            <GoodDetailConnected />
            </Provider>
        )
    }
}

export default GoodDetailApp;