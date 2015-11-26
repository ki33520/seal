'use strict';

import {
    SHOW_ALERT,HIDE_ALERT
} from "./action.es6";

export function alertReducer(state={},action){
    switch(action.type){
        case SHOW_ALERT:
            return Object.assign({},state,{
                alertActive:true,
                alertContent:action.content
            });
        case HIDE_ALERT:
            return Object.assign({},state,{
                alertActive:false,
                alertContent:action.content
            });
        default:
            return state;
    }
}