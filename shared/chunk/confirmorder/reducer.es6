'use strict';

import {combineReducers} from "redux";
import {VERIFY_PAYPASSWORD_REQUEST,
    VERIFY_PAYPASSWORD_RESPONSE,
START_SUBMITORDER,FINISH_SUBMITORDER,
CHANGE_RECEIVER,CHANGE_DELIVERYTIME,CHANGE_COUPON,CHANGE_INVOICE,
TOGGLE_TICKET,TOGGLE_BALANCE,CHANGE_PAYPASSWORD} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function orderByParam(state={},action){
    switch(action.type){
        case CHANGE_RECEIVER:
            var order = {...state.order,checkedReceiver:action.checkedReceiver}
            return Object.assign({},state,{
               order
            })
        case CHANGE_DELIVERYTIME:
            var order = {...state.order,checkedDeliveryTime:action.checkedDeliveryTime}
            return Object.assign({},state,{
                order
            })
        case CHANGE_COUPON:
            var order = {...state.order,checkedCoupon:action.checkedCoupon}
            return Object.assign({},state,{
                order
            })
        case CHANGE_INVOICE:
            var order = {...state.order,checkedInvoice:action.checkedInvoice}
            return Object.assign({},state,{
                order
            })
        case TOGGLE_TICKET:
            var order = {...state.order,useTicket:action.useTicket}
            return Object.assign({},state,{
                order
            })
        case TOGGLE_BALANCE:
            var order = {...state.order,useBalance:action.useBalance}
            return Object.assign({},state,{
                order
            })
        case CHANGE_PAYPASSWORD:
            var order = {...state.order,payPassword:action.payPassword}
            return Object.assign({},state,{
                order
            })
        case VERIFY_PAYPASSWORD_REQUEST:
            return Object.assign({},state,{
                paypasswordVerifing:true
            })
        case VERIFY_PAYPASSWORD_RESPONSE:
            return Object.assign({},state,{
                paypasswordVerified:true,
                paypasswordVerifing:false
            })
        case START_SUBMITORDER:
            return Object.assign({},state,{
                orderSubmiting:true,
                orderSubmited:false
            })
        case FINISH_SUBMITORDER:
            const {orderNo,homeURL,orderDtailURL,orderStatusURL,
                openId,wxOpenId} = action.res.result;
            return Object.assign({},state,{
                order:{...state.order,orderNo,orderDtailURL,orderStatusURL,homeURL,
                    openId,wxOpenId},
                orderSubmited:action.res.orderSubmited,
                orderSubmiting:false,
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    orderByParam
})

export default rootReducer;