'use strict';
import {combineReducers} from "redux";

export function ordersByParam(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ordersByParam
})

export default rootReducer;
