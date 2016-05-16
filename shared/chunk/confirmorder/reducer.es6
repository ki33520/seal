'use strict';

import {combineReducers} from "redux";
import {
    CHANGE_RECEIVER,CHANGE_COUPON,
    START_SUBMITORDER,FINISH_SUBMITORDER,
    REQUEST_PAYGATEWAY,RESPONSE_PAYGATEWAY,
    REQUEST_SHIPFEE,RESPONSE_SHIPFEE,
    START_VERIFYORDER,FINISH_VERIFYORDER
} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";
import _ from "../../lib/lodash"

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
                let couponFee = order.checkedCoupon.couponFee
                if((order.productFee - couponFee) < 0){
                    couponFee = order.productFee
                }
                order.couponFee =  couponFee
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
                console.log("order",order.isPostageFree)
                if(order.isPostageFree){
                    order.shipFee = 0
                }else{
                    order.shipFee = action.res.result
                }
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
        case START_VERIFYORDER:
            return Object.assign({},state,{
                orderVerifying:true,
                orderVerified:false
            })
        case FINISH_VERIFYORDER:
            return Object.assign({},state,{
                orderVerifying:false,
                orderVerified:action.res.isVerified,
                orderVerifiedErrCode:action.res.errCode,
                orderVerifiedErrMsg:errMsgByCode(action.res.errCode)
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
                paygatewayFetching:true,
                paygatewayFetched:action.res.isFetched
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function errMsgByCode(errCode){
    let errMsg = ""
    switch(errCode){
        case -1:
            errMsg = "校验失败,请检查网络是否可用"
            break
        case -402104:
        case -402105:
            // errMsg = "商品code不存在"
            // errMsg = "商品已下架，请重新提交!"
            errMsg = "超出购买限制，请重新提交!"
            break
        case -402106:
        case -402112:
            // errMsg = "商品库存不足"
            // errMsg = "超出库存数量，请重新提交!"
            errMsg = "超出购买限制，请重新提交!"
            break
        case -402107:
            // errMsg = "商品购买数量已超出商品限购数"
            // errMsg = "超出限购数量，请重新提交!"
            errMsg = "超出购买限制，请重新提交!"
            break
        case -402109:
            // errMsg = "商品购买数量低于起购数"
            errMsg = "超出购买限制，请重新提交!"
            break
        case -402110:
            // errMsg = "购买商品总额超出每日购买限额"
            errMsg = "海关规定购买多件的总价不能超过2000元，请调整订单"
            break
        case -402305:
            errMsg = "订单金额有变更，请重新提交!"
            break
        case 0:
            errMsg = ""
            break
        default:
            errMsg = "数据异常，请重新提交订单!"
            break
    }
    return errMsg
}

function calculateTotalFee(order){
    let productFee = _.subtract(order.reduceFee,order.couponFee) < 0? 0 : _.subtract(order.reduceFee,order.couponFee)
    // console.log('productFee',productFee)
    let totalFee = _.sum([productFee,order.shipFee,order.abroadFee,order.tariffFee])
    totalFee = totalFee < 0.3 ? 0.3:totalFee
    return totalFee
}

const rootReducer = combineReducers({
    orderByParam
})

export default rootReducer;