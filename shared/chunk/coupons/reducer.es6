'use strict'
import {
    REQUEST_GOODS,
    RECEIVE_GOODS
} from "./action.es6";
import {combineReducers} from "redux";
import _ from "lodash";


function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            var list = _.union(state.pagination.list,action.pagination.list);
            action.pagination.list = list;
            return Object.assign({},state,{
                isFetching:false,
                pagination:action.pagination
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;