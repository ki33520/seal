'use strict'
import {combineReducers} from "redux";
import {REQUEST_GOODS,RECEIVE_GOODS} from "./action.es6";

function flashBuy(state={},action){
    switch(action.type){
        case REQUEST_GOODS:
            return Object.assign({},state,{
                isFetching:true
            });
        case RECEIVE_GOODS:
            return Object.assign({},state,{
                isFetching:false,
                pagination:action.pagination
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    flashBuy
});

export default rootReducer;