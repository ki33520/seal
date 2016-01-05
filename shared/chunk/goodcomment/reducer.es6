'use strict';

import {combineReducers} from "redux";
import {RECEIVE_COMMENT,REQUEST_COMMENT} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function commentById(state={},action){
    switch(action.type){
        case REQUEST_COMMENT:
            return Object.assign({},state,{
                isFetching:true
            })
        case RECEIVE_COMMENT:
            return Object.assign({},state,{
                isFetching:false
            },action.res)
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    commentById
});

export default rootReducer;