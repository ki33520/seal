'use strict';

import {combineReducers} from "redux";
import {RECEIVE_MEMBER,REQUEST_MEMBER} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function memberCenterByUser(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memberCenterByUser
});

export default rootReducer;