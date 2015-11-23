'use strict';

import {combineReducers} from "redux";
import {CHANGE_FIELD,START_CHANGE_BASIC,FINISH_CHANGE_BASIC} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function basicByForm(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        case START_CHANGE_BASIC:
            return Object.assign({},state,{
                basicChanging:true,
                basicChanged:false
            });
        case FINISH_CHANGE_BASIC:
            return Object.assign({},state,{
                basicChanging:false,
                basicChanged:action.res.isChanged,
                errMsg:action.res.errMsg
            },action.res.result);
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}
function memberInfo(state={},action){
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
    memberInfo,
    basicByForm
});

export default rootReducer;