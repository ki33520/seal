'use strict';

import {combineReducers} from "redux";
import {CHANGE_FIELD,START_CHANGE_BASIC,FINISH_CHANGE_BASIC,START_CHANGE_PASSWORD,FINISH_CHANGE_PASSWORD,START_BIND_MEMBERCARD,FINISH_BIND_MEMBERCARD,START_SEND_VERIFYCODE,FINISH_SEND_VERIFYCODE} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function basicByForm(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        case START_CHANGE_BASIC:
            return Object.assign({},state,{
                basicChanging:true,
                basicChanged:false
            });
        case FINISH_CHANGE_BASIC:
            return Object.assign({},state,{
                basicChanging:false,
                basicChanged:action.res.isChanged,
                errMsg:action.res.errMsg
            },action.res.result);
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function passwordByForm(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        case START_CHANGE_PASSWORD:
            return Object.assign({},state,{
                passwordChanging:true,
                passwordChanged:false
            });
        case FINISH_CHANGE_PASSWORD:
            return Object.assign({},state,{
                passwordChanging:false,
                passwordChanged:action.res.isChanged,
                errMsg:action.res.errMsg
            });
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function membercardByForm(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        case START_BIND_MEMBERCARD:
            return Object.assign({},state,{
                membercardChanging:true,
                membercardChanged:false
            });
        case FINISH_BIND_MEMBERCARD:
            return Object.assign({},state,{
                membercardChanging:false,
                membercardChanged:action.res.isChanged,
                errMsg:action.res.errMsg
            });
        case START_SEND_VERIFYCODE:
            return Object.assign({},state,{
                verifyCodeSending:true,
                verifyCodeSended:false
            })
        case FINISH_SEND_VERIFYCODE:
            return Object.assign({},state,{
                verifyCodeSending:false,
                verifyCodeSended:action.res.isSend,
                errMsg:action.res.errMsg
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function memberInfo(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            return Object.assign({},state,{
                [name]:value
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    memberInfo,
    basicByForm,
    passwordByForm,
    membercardByForm
});

export default rootReducer;