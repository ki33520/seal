'use strict';

import {combineReducers} from "redux";
import {CHANGE_FIELD} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";


function helpInfo(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    helpInfo
});

export default rootReducer;