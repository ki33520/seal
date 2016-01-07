'use strict'
import {combineReducers} from "redux";
import _ from "lodash";
import {REQUEST_GOODS,RECEIVE_GOODS} from "./action.es6";

function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            return Object.assign({},state,{
                isFetching:false,
                goodsList:action.res
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;