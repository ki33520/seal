'use strict';

import {combineReducers} from "redux";
import {CHANGE_FIELD,START_CHANGE_FEEDBACK,FINISH_CHANGE_FEEDBACK} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function helpInfo(state={},action){
    switch(action.type){
        default:
            return state;
    }
}

function feedbackByForm(state={},action){
    switch(action.type){
	    case CHANGE_FIELD:
	        const {name,value} = action;
	        return Object.assign({},state,{
	            [name]:value
	        });
	    case START_CHANGE_FEEDBACK:
	        return Object.assign({},state,{
	            feedbackChanging:true,
	            feedbackChanged:false
	        });
	    case FINISH_CHANGE_FEEDBACK:
	        return Object.assign({},state,{
	            feedbackChanging:false,
	            feedbackChanged:action.res.isChanged,
	            errMsg:action.res.errMsg
	        });
	    case SHOW_ALERT:
	    case HIDE_ALERT:
	        return alertReducer(state,action)
	    default:
	        return state;
    }
}

const rootReducer = combineReducers({
    helpInfo,
    feedbackByForm
});

export default rootReducer;