'use strict';
import {combineReducers} from "redux";

function cartByUser(state = {},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cartByUser
});

export default rootReducer;