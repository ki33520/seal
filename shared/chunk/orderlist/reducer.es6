'use strict';
import {combineReducers} from "redux";
import {RECEIVE_ORDER,REQUEST_ORDER} from "./action.es6";
import _ from "lodash";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

export function ordersByParam(state={},action){
    switch(action.type){
        case REQUEST_ORDER:
            return Object.assign({},state,{
            	isFetched:false,
                isFetching:true
            })
        case RECEIVE_ORDER:
            var obj = action.res;
            var status = action.param.status;
            var newOrderList = action.res.orders[status].list;
            var oldOrderList = state.orders[status] ? state.orders[status].list : [];
            obj.isFetching = false;
            obj.orders.forEach((v,k)=>{
                if(v){
                    let oldlist = state.orders[k] && state.orders[k].list ? state.orders[k].list : [];
                    let newlist = v.list ? v.list : [];
                    v.list = _.union(oldlist,newlist);
                }else{
                    obj.orders[k] = state.orders[k];
                }
            })
            return Object.assign({},state,obj);
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
