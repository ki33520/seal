'use strict';
import {combineReducers} from "redux";
import {
    START_DELETE_IDCARD,FINISH_DELETE_IDCARD,
    START_UPLOAD_IDCARD,FINISH_UPLOAD_IDCARD,
    START_UPDATE_IDCARD,FINISH_UPDATE_IDCARD,
    START_ADD_IDCARD,FINISH_ADD_IDCARD,
    START_CHANGE_UPDATE,FINISH_CHANGE_UPDATE
} from "./constant.es6";
 
function index(state={},action){
    switch(action.type){
    	 
        default:
            return state;
    }
}

function update(state={},action){
    switch(action.type){
        case FINISH_CHANGE_UPDATE:
            const {param} = action;
            return Object.assign({},state,{
                idcard: param
            });
         
        default:
            return state;
    }
}

function addcard(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,update,addcard
});

export default rootReducer;