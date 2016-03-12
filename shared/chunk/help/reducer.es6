'use strict';

import {combineReducers} from "redux";
import {CHANGE_FIELD,REQUEST_QUESTION,RESPONSE_QUESTION,START_CHANGE_FEEDBACK,FINISH_CHANGE_FEEDBACK} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function questionCategory(state={},action){
    switch(action.type){
        default:
            return state;
    }
}
function questionByForm(state={},action){
	switch(action.type){
	    case REQUEST_QUESTION:
            var questionList = {...state.questionList};
            var param = action.param;
            if(questionList &&  questionList.catalogId !== param.catalogId){
            	questionList.list = [];
            	questionList.catalogName = param.catalogName;
            }
	        return Object.assign({},state,{
	            isFetching:true,
	            isFetched:false
	        },{questionList:questionList});
	    case RESPONSE_QUESTION:
            var questionList = {...state.questionList};
	    	var newQuestionList = action.res.questionList;
            var param = action.param;
	    	if(questionList && questionList.catalogId === newQuestionList.catalogId && param.start !==1){
	    		newQuestionList.list = _.union(questionList.list,newQuestionList.list);
	    	};
	        return Object.assign({},state,{
	            isFetching:false,
	            isFetched:action.res.isFetched,
	            questionList: newQuestionList,
	            msg:action.res.msg
	        });
	    case SHOW_ALERT:
	    case HIDE_ALERT:
	        return alertReducer(state,action)
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
    questionCategory,
    questionByForm,
    feedbackByForm
});

export default rootReducer;