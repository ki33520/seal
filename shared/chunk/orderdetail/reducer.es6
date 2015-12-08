'use strict';
import {
    REQUEST_LOGISTICS,RESPONSE_LOGISTICS
} from "./action.es6";
import {combineReducers} from "redux";

function orderByParam(state={},action){
    switch(action.type){
        case REQUEST_LOGISTICS:
            return Object.assign({},state,{
                logisticsFetching:true
            })
        case RESPONSE_LOGISTICS:
            return Object.assign({},state,{
                logisticsFetching:false,
                logistics:action.res?action.res.logistics:null
            })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    orderByParam
});

export default rootReducer;