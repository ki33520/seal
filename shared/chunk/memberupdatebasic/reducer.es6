'use strict';

import {combineReducers} from "redux";
import {CHANGE_NICKNAME,CHANGE_GENDER,CHANGE_BIRTHDY,RECEIVE_COLLECT,REQUEST_COLLECT} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function memberInfoByUser(state={},action){
    const {name,value} = action;
    switch(action.type){
        case CHANGE_NICKNAME:
            var memberInfo = Object.assign({},state.memberInfo);
            memberInfo[name] = value;
            return Object.assign({},state,{
                memberInfo
            })
        case CHANGE_GENDER:
            var memberInfo = Object.assign({},state.memberInfo);
            memberInfo[name] = value;
            return Object.assign({},state,{
                memberInfo
            })
        case CHANGE_BIRTHDY:
            var memberInfo = Object.assign({},state.memberInfo);
            memberInfo[name] = value;
            return Object.assign({},state,{
                memberInfo
            })
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
    memberInfoByUser
});

export default rootReducer;