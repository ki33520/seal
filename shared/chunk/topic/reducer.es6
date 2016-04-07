'use strict'
import {
    REQUEST_GOODS,RECEIVE_GOODS
} from "./action.es6";
import {combineReducers} from "redux";
import _ from "lodash";


function goodsByParam(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case RECEIVE_GOODS:
            let list = _.union(state.list,action.res);
            return Object.assign({},state,{
                isFetching:false,
                isFetched:true,
                list:list
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;