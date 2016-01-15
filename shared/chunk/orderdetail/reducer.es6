'use strict';
import {
    REQUEST_LOGISTICS,RESPONSE_LOGISTICS,REQUEST_ClOSEORDER,RESPONSE_ClOSEORDER,REQUEST_DELIVERYORDER,RESPONSE_DELIVERYORDER
} from "./action.es6";
import {combineReducers} from "redux";
import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function orderByParam(state={},action){
    switch(action.type){
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
                closeOrderChanged:false
            });
        case RESPONSE_ClOSEORDER:
            return Object.assign({},state,{
                closeOrderChanging:false,
                closeOrderChanged: action.res.isChanged,
                errMsg: action.res.errMsg
            });
        case REQUEST_DELIVERYORDER:
            return Object.assign({},state,{
                deliveryOrderChanging:true,
                deliveryOrderChanged:false
            });
        case RESPONSE_DELIVERYORDER:
            return Object.assign({},state,{
                deliveryOrderChanging:false,
                deliveryOrderChanged: action.res.isChanged,
                errMsg: action.res.errMsg
            });
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