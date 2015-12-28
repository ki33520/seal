'use strict'
import {
SORT_NORMAL
} from "./action.es6";
import {combineReducers} from "redux";
import _ from "lodash";


function goodsByParam(state={},action){
    switch(action.type){

        case SORT_NORMAL:
            return Object.assign({},state,{
                isFetching:false,
                pagination:action.res
            });
         
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodsByParam
});

export default rootReducer;