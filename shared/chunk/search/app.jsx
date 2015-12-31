'use strict'
import React from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import SearchBox from "./component.jsx";

function selector(state){
    const {keywords,isFetching} = state.goodsByParam;
    return {
        keywords,
        isFetching
    };
}

let SearchConnected = connect(selector)(SearchBox);

class SearchApp extends React.Component{
    render(){
        const {keywords} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            goodsByParam:{
                isFetching:false,
                keywords
            }
        });
        return (
            <Provider store={store}>
            <SearchConnected />
            </Provider>
        )
    }
}

export default SearchApp;