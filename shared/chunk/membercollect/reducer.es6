'use strict';

import {combineReducers} from "redux";
import {RECEIVE_COLLECT,REQUEST_COLLECT,START_TOGGLE_COLLECTED,FINISH_TOGGLE_COLLECTED} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function memberCollectByUser(state={},action){
    switch(action.type){
        case REQUEST_COLLECT:
            return Object.assign({},state,{
                isFetched:false,
                isFetching:true
            })
        case RECEIVE_COLLECT:
            var collect = {...state.collect};
            action.res.list = _.union(collect.list,action.res.list);
            return Object.assign({},state,{
                isFetched:true,
                isFetching:false,
                collect:action.res
            })
        case START_TOGGLE_COLLECTED:
            return Object.assign({},state,{
                isToggling:true,
                isToggled:false
            });
        case FINISH_TOGGLE_COLLECTED:
            var collect = {...state.collect};
            _.remove(collect.list, function(n) {
                return n.singleCode === action.param.singleCode;
            });
            return Object.assign({},state,{
                isToggling:false,
                isToggled:true,
                collect: collect
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