'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/redux-helper.es6";
import CommentList from "./component.jsx";

function selector(state){
    const {allComment,showComment,isFetching,isFetched} = state.commentByUser;
    return {
        allComment,
        showComment,
        isFetched,
        isFetching
    };
}

let CommentListConnected = connect(selector)(CommentList);

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}

class CommentApp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {allComment,showComment,isFetched} = this.props.initialState;
        const initialState = {
            commentByUser:{
                allComment,
                showComment,
                isFetched,
                isFetching: false
            }
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <CommentListConnected />
            </Provider>
        )
    }
}

export default CommentApp;