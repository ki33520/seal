'use strict'
import {combineReducers} from "redux";
import _ from "lodash";

function topic(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    topic
});

export default rootReducer;