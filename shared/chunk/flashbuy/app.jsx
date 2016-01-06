'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Navbar from "./component.jsx";

function selector(state){
    const {navbar,isFetching} = state.goodsByParam;
    return {
        navbar,
        isFetching
    };
}

let NavbarConnected = connect(selector)(Navbar);

class NavbarApp extends React.Component{
    render(){
        const {navbar} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodsByParam:{
                isFetching:false,
                navbar
            }
        });
        return (
            <Provider store={store}>
            <NavbarConnected />
            </Provider>
        )
    }
}

export default NavbarApp;