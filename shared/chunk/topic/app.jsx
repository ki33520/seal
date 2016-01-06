'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import Navbar from "./component.jsx";

function selector(state){
    return state
}

let NavbarConnected = connect(selector)(Navbar);

class NavbarApp extends React.Component{
    render(){
        const {data,title} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            topic:{
                isFetching:false,
                data,
                title
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