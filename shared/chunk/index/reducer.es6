'use strict';

import {
    REQUEST_HOTWORD,
    RESPONSE_HOTWORD
} from "./constant.es6";
import {combineReducers} from "redux";

function search(state={},action){
    switch(action.type){
        case REQUEST_HOTWORD:
            return Object.assign({},state,{
                hotwordFetched:false,
                hotwordFetching:true
            });
        case RESPONSE_HOTWORD:
            const hotwords = action.res.result;
            const hotwordFetched = action.res.hotwordFetched;
            return Object.assign({},state,{
                hotwords,
                hotwordFetched,
                hotwordFetching:false
            })
        default:
            return state;
    }
}

function index(state={},action){
    switch(action.type){
        default:
            return state
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;