'use strict';

import {combineReducers} from "redux";
import {RECEIVE_MEMBER,REQUEST_MEMBER} from "./action.es6";

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