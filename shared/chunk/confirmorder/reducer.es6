'use strict';

import {combineReducers} from "redux";
import {
    CHANGE_RECEIVER,CHANGE_COUPON,
    START_SUBMITORDER,FINISH_SUBMITORDER,
    REQUEST_PAYGATEWAY,RESPONSE_PAYGATEWAY,
    REQUEST_SHIPFEE,RESPONSE_SHIPFEE,
} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function orderByParam(state={},action){
    switch(action.type){
        case CHANGE_RECEIVER:
            var order = {...state.order,checkedReceiver:action.checkedReceiver}
            return Object.assign({},state,{
               order
            })
        case CHANGE_COUPON:
            var order = {...state.order,checkedCoupon:action.checkedCoupon}
            if(action.checkedCoupon){
                order.couponFee = order.checkedCoupon.couponFee
            }else{
                order.couponFee = 0
            }
            order.totalFee = calculateTotalFee(order)
            return Object.assign({},state,{
                order
            })
        case REQUEST_SHIPFEE:
            return Object.assign({},state,{
                shipfeeFetching:true,
                shipfeeFetched:false
            })
        case RESPONSE_SHIPFEE:
            order = {...state.order}
            if(action.res.isFetched){
                // order.totalFee += (action.res.result - order.shipFee)
                order.shipFee = action.res.result
                order.totalFee = calculateTotalFee(order)
            }
            return Object.assign({},state,{
                order
            })
        case START_SUBMITORDER:
            return Object.assign({},state,{
                orderSubmiting:true,
                orderSubmited:false
            })
        case FINISH_SUBMITORDER:
            order = {...state.order}
            if(action.res.orderSubmited){
                const {orderNo} = action.res.result;
                order = Object.assign({},order,{
                    orderNo
                })
            }
            return Object.assign({},state,{
                order,
                orderSubmited:action.res.orderSubmited,
                orderSubmiting:false,
            })
        case REQUEST_PAYGATEWAY:
            return Object.assign({},state,{
                paygatewayFetching:true,
                paygatewayFetched:false
            })
        case RESPONSE_PAYGATEWAY:
            // console.log('RESPONSE_PAYGATEWAY')
            let cashierParam = action.res.isFetched?action.res.result:{}
            var order = {...state.order,cashierParam}
            return Object.assign({},state,{
                order,
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

function calculateTotalFee(order){
    let totalFee = order.productFee + order.shipFee + order.abroadFee + order.tariffFee
        - order.promoFee - order.couponFee
    // console.log('productFee',order.productFee)
    // console.log('shipFee',order.shipFee)
    // console.log('abroadFee',order.abroadFee)
    // console.log('tariffFee',order.tariffFee)
    // console.log('promoFee',order.promoFee)
    // console.log('couponFee',order.couponFee)
    totalFee = totalFee < 0.07 ? 0.07:totalFee
    return totalFee
}

const rootReducer = combineReducers({
    orderByParam
})

export default rootReducer;