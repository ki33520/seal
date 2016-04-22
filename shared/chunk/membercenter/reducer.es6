'use strict';

import {combineReducers} from "redux";
import {RECEIVE_MEMBER,REQUEST_MEMBER} from "./action.es6";
import {cart} from "../common/reducer.es6";

function memberCenterByUser(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memberCenterByUser,
    cart
});

export default rootReducer;