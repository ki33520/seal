'use strict';
import {
    CHANGE_FIELD,REQUEST_SAVECOMMENT,RESPONSE_SAVECOMMENT,REQUEST_LOGISTICS,RESPONSE_LOGISTICS,REQUEST_ClOSEORDER,RESPONSE_ClOSEORDER,REQUEST_DELIVERYORDER,RESPONSE_DELIVERYORDER,REQUEST_PAYGATEWAY,RESPONSE_PAYGATEWAY
} from "./action.es6";
import {combineReducers} from "redux";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function orderByParam(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value,key} = action;
            var order = {...state.order};
            if(key!==undefined){
                order.itemList[key][name] = value;
            }else{
                state[name] = value;
            }
            return Object.assign({},state,{
                order
            });
        case REQUEST_SAVECOMMENT:
            return Object.assign({},state,{
                saveCommentChanging:true,
                saveCommentChanged:false,
                msg:action.res?action.res.msg: null
            })
        case RESPONSE_SAVECOMMENT:
            return Object.assign({},state,{
                saveCommentChanging:false,
                saveCommentChanged: action.res.isChanged,
                msg:action.res?action.res.msg: null
            })
        case REQUEST_LOGISTICS:
            return Object.assign({},state,{
                logisticsFetching:true
            })
        case RESPONSE_LOGISTICS:
            return Object.assign({},state,{
                logisticsFetching:false,
                logistics:action.res?action.res:null
            })
        case REQUEST_ClOSEORDER:
            return Object.assign({},state,{
                closeOrderChanging:true,
                closeOrderChanged:false,
                msg:action.res?action.res.msg: null
            })
        case RESPONSE_ClOSEORDER:
            state.order.orderStatus = action.res.orderStatus ? action.res.orderStatus : state.order.orderStatus;
            return Object.assign({},state,{
                closeOrderChanging:false,
                closeOrderChanged: action.res.isChanged,
                msg:action.res?action.res.msg: null
            })
        case REQUEST_DELIVERYORDER:
            return Object.assign({},state,{
                deliveryOrderChanging:true,
                deliveryOrderChanged:false,
                msg:action.res?action.res.msg: null
            })
        case RESPONSE_DELIVERYORDER:
            state.order.orderStatus = action.res.orderStatus ? action.res.orderStatus : state.order.orderStatus;
            return Object.assign({},state,{
                deliveryOrderChanging:false,
                deliveryOrderChanged: action.res.isChanged,
                msg:action.res?action.res.msg: null
            })
        case REQUEST_PAYGATEWAY:
            return Object.assign({},state,{
                paygatewayFetching:true,
                paygatewayFetched:false
            })
        case RESPONSE_PAYGATEWAY:
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


const rootReducer = combineReducers({
    orderByParam
});

export default rootReducer;