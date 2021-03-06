'use strict';
import {combineReducers} from "redux";
import {RECEIVE_ORDER,REQUEST_ORDER,REQUEST_DELIVERYORDER,RESPONSE_DELIVERYORDER,REQUEST_PAYGATEWAY,RESPONSE_PAYGATEWAY,CHANGE_ORDER} from "./action.es6";
import _ from "lodash";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

export function ordersByParam(state={},action){
    switch(action.type){
        case CHANGE_ORDER:
            var flag = state.flag;
            var orders = {...state.orders};
            orders[flag].list.map((v,k)=>{
                if(v.orderId === action.order.orderId){
                    v.orderStatus = action.status;
                }
            });
            return Object.assign({},state,{
                orders: orders
            })
        case REQUEST_ORDER:
            const status = action.param.status;
            if(!state.orders[status]){
                state.orders[status] = {}
            }
            state.orders[status].isFetched = false;
            state.orders[status].isFetching = true;
            return Object.assign({},state,{
            	isFetched:false,
                isFetching:true
            })
        case RECEIVE_ORDER:
            var obj = action.res;
            var status = action.param.status;
            obj.isFetching = false;
            obj.orders.forEach((v,k)=>{
                if(v){
                    const oldlist = state.orders[k] && state.orders[k].list || [];
                    const newlist = v.list || [];
                    v.list = _.union(oldlist,newlist);
                }else{
                    obj.orders[k] = state.orders[k];
                }
            })
            return Object.assign({},state,obj);
        case REQUEST_DELIVERYORDER:
            return Object.assign({},state,{
                deliveryOrderChanging:true,
                deliveryOrderChanged:false,
                msg:action.res?action.res.msg: null
            })
        case RESPONSE_DELIVERYORDER:
            const flag = state.flag;
            var orders = {...state.orders};
            var {index} = action.param;
            var {orderStatus} = action.res;
            var orderList = orders[flag].list;
            orderList[index].orderStatus = orderStatus ? orderStatus : orderList[index].orderStatus;
            var obj = {
                orders,
                deliveryOrderChanging: false,
                deliveryOrderChanged: action.res.isChanged,
                msg:action.res?action.res.msg: null
            }
            return Object.assign({},state,obj)
        case REQUEST_PAYGATEWAY:
            return Object.assign({},state,{
                paygatewayFetching:true,
                paygatewayFetched:false
            })
        case RESPONSE_PAYGATEWAY:
            let cashierParam = action.res.isFetched?action.res.result:{};
            return Object.assign({},state,{
                cashierParam,
                paygatewayFetching:false,
                paygatewayFetched:action.res.isFetched
            })
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
