'use strict';
import {combineReducers} from "redux";
 
function index(state={},action){
    switch(action.type){
    	 
        default:
            return state;
    }
}

function update(state={},action){
    switch(action.type){
         
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