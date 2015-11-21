'use strict';

import {combineReducers} from "redux";
import {RECEIVE_COLLECT,REQUEST_COLLECT} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function memberCollectByUser(state={},action){
    switch(action.type){
        case REQUEST_COLLECT:
            return Object.assign({},state,{
                isFetching:true
            })
        case RECEIVE_COLLECT:
            return Object.assign({},state,{
                isFetching:false,
                collect:action.res
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memberCollectByUser
});

export default rootReducer;