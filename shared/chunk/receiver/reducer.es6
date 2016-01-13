'use strict';

import {combineReducers} from "redux";

import {
    CHANGE_FIELD,
    REQUEST_PROVINCES,RESPONSE_PROVINCES,
    REQUEST_CITIES,RESPONSE_CITIES,
    REQUEST_DISTRICTS,RESPONSE_DISTRICTS,
    REQUEST_RECEIVER,RESPONSE_RECEIVER,
    START_SAVE_RECEIVER,FINISH_SAVE_RECEIVER
} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function receiverByForm(state={},action){
    switch(action.type){
        case REQUEST_RECEIVER:
            return Object.assign({},state,{
                receiverFetching:true
            })
        case RESPONSE_RECEIVER:
            var receiver = null,receiverFetched = false;
            if(action.res.isFetched === true){
                receiver = action.res.receiver;
                receiverFetched = true
            }
            return Object.assign({},state,{
                receiverFetching:false,
                receiverFetched,
                receiver
            })
        case CHANGE_FIELD:
            const {name,value} = action;
            var receiver = {...state.receiver}
            receiver[name] = value;
            return Object.assign({},state,{
                receiver
            });
        case REQUEST_PROVINCES:
            return Object.assign({},state,{
                provinceFetching:true
            })
        case RESPONSE_PROVINCES:
            var provinces = state.provinces;
            var cities = state.cities;
            var districts = state.districts;
            // console.log('state',state)
            provinces = [...provinces,...action.res.items];
            cities = cities.slice(0,1);
            districts = districts.slice(0,1);
            return Object.assign({},state,{
                provinceFetching:false,
                provinces,
                cities,
                districts
            })
        case REQUEST_CITIES:
            return Object.assign({},state,{
                cityFetching:true
            })
        case RESPONSE_CITIES:
            var cities = state.cities;
            var districts = state.districts;
            if(cities.length === 1){
                cities = [...cities,...action.res.items];
            }else{
                cities = [cities[0],...action.res.items]
            }
            districts = districts.slice(0,1);
            return Object.assign({},state,{
                cityFetching:false,
                cities,
                districts
            })
        case REQUEST_DISTRICTS:
            return Object.assign({},state,{
                districtFetching:true
            })
        case RESPONSE_DISTRICTS:
            var districts = state.districts;
            if(districts.length === 1){
                districts = [...districts,...action.res.items];
            }else{
                districts = [districts[0],...action.res.items]
            }
            return Object.assign({},state,{
                districtFetching:false,
                districts
            })
        case START_SAVE_RECEIVER:
            return Object.assign({},state,{
                receiverSaving:true,
                receiverSaved:false
            });
        case FINISH_SAVE_RECEIVER:
            return Object.assign({},state,{
                receiverSaving:false,
                ...action.res
            });
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function receiverByUser(state={},action){
    switch(action.type){
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    receiverByUser,
    receiverByForm
});

export default rootReducer;