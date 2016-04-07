'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import CommentList from "./component.jsx";
import * as actions from "./action.es6";

let ReceiverConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(CommentList,actions));

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

class CommentApp extends Component{
    render(){
        const {allComment,showComment,isFetched} = this.props.initialState;
        const initialState = {
            commentByUser:{
                changeScene:this.props.changeScene,
                allComment,
                showComment,
                isFetched,
                isFetching: false
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

export default CommentApp;