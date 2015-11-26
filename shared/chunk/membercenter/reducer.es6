'use strict';

import {combineReducers} from "redux";
import {RECEIVE_MEMBER,REQUEST_MEMBER} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function memberCenterByUser(state={},action){
    switch(action.type){
        case REQUEST_MEMBER:
            return Object.assign({},state,{
                isFetching:true
            })
        case RECEIVE_MEMBER:
            return Object.assign({},state,{
                isFetching:false,
                member:action.res
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memberCenterByUser
});

export default rootReducer;