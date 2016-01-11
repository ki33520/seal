'use strict';
import {combineReducers} from "redux";
import {RECEIVE_ORDER,REQUEST_ORDER} from "./action.es6";
import _ from "lodash";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

const statusArr = ["a", "b", "c", "d", "e"];

export function ordersByParam(state={},action){
    switch(action.type){
        case REQUEST_ORDER:
            return Object.assign({},state,{
                isFetching:true
            })
        case RECEIVE_ORDER:
        	var obj = {};
        	var index = action.param.pageIndex;
        	var list = [];
        	obj.orders = Object.assign({},state.orders,action.res.orders);
        	if(index>1){
        		console.log(state.orders,action.res.orders)
        		// list = _.union(state.orders[statusArr[index]].list,action.res.orders[statusArr[index]].list);
        		// obj.orders[statusArr[index]].list = list;
        	};
            return Object.assign({},state,{
                isFetching:false
            },obj)
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ordersByParam
});

export default rootReducer;
