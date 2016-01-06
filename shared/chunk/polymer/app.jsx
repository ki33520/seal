'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import Polymer from "./component.jsx";
import * as actions from "./action.es6";

let PolymerConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(Polymer,actions));

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

class CategoryApp extends React.Component{
    render(){
        const {categories} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            allCategory:{
                categories
            }
        });
        return (
            <Provider store={store}>
            <PolymerConnected />
            </Provider>
        )
    }
}

export default CategoryApp;