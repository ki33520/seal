'use strict';

import {combineReducers} from "redux";

function couponById(state={},action){
    switch(action.type){
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    couponById
});

export default rootReducer;