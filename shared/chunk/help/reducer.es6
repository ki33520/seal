'use strict';

import {combineReducers} from "redux";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function helpInfo(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    helpInfo
});

export default rootReducer;