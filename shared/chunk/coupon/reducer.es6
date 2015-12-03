'use strict'

import {combineReducers} from "redux";

function receiverByUser(state={},action){
    switch(action.type){
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    receiverByUser
});

export default rootReducer;