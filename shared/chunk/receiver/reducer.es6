'use strict';

import {combineReducers} from "redux";
import _ from "lodash"

import {
    CHANGE_FIELD,CHANGE_RECEIVER,SELECT_RECEIVER,
    REQUEST_PROVINCES,RESPONSE_PROVINCES,
    REQUEST_CITIES,RESPONSE_CITIES,
    REQUEST_DISTRICTS,RESPONSE_DISTRICTS,
    REQUEST_RECEIVER,RESPONSE_RECEIVER,
    REQUEST_RECEIVERS,RESPONSE_RECEIVERS,
    START_SAVERECEIVER,FINISH_SAVERECEIVER,
    START_CREATERECEIVER,FINISH_CREATERECEIVER,
    START_DELETERECEIVER,FINISH_DELETERECEIVER,
    START_SETDEFAULT,FINISH_SETDEFAULT
} from "./constant.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/constant.es6";
import {alertReducer} from "../common/reducer.es6";

function updateReceiver(state={},action){
    switch(action.type){
        case REQUEST_RECEIVER:
            return Object.assign({},state,{
                receiverFetching:true
            })
        case RESPONSE_RECEIVER:
            let receiver = null
            if(action.res.isFetched === true){
                receiver = action.res.receiver;
            }
            return Object.assign({},state,{
                receiverFetching:false,
                receiverFetched:action.res.isFetched,
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
        case RESPONSE_PROVINCES:
        case REQUEST_CITIES:
        case RESPONSE_CITIES:
        case REQUEST_DISTRICTS:
        case RESPONSE_DISTRICTS:
            if(action.scene === "updateReceiver"){
                return cascadeArea(state,action)
            }
            return state
        case START_SAVERECEIVER:
            return Object.assign({},state,{
                receiverSaving:true,
                receiverSaved:false
            });
        case FINISH_SAVERECEIVER:
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

function addReceiver(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            var receiver = {...state.receiver}
            receiver[name] = value;
            return Object.assign({},state,{
                receiver
            });
        case START_CREATERECEIVER:
            return Object.assign({},state,{
                receiverSaving:true,
                receiverSaved:false
            });
        case FINISH_CREATERECEIVER:
            return Object.assign({},state,{
                receiverSaving:false,
                ...action.res
            });
        case REQUEST_PROVINCES:
        case RESPONSE_PROVINCES:
        case REQUEST_CITIES:
        case RESPONSE_CITIES:
        case REQUEST_DISTRICTS:
        case RESPONSE_DISTRICTS:
            if(action.scene === "addReceiver"){
                return cascadeArea(state,action)
            }
            return state
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function cascadeArea(state,action){
    switch(action.type){
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
    }
}

function receiverByUser(state={},action){
    let receivers = state.receivers
    switch(action.type){
        case SELECT_RECEIVER:
            return Object.assign({},state,{
                checkedReceiver:action.receiver
            })
        case CHANGE_RECEIVER:
            let _receivers = [...receivers]
            _receivers = _receivers.map((_receiver)=>{
                if(_receiver.id === action.receiver.id){
                    _receiver = Object.assign({},_receiver,action.receiver)
                }
                return _receiver
            })
            let checkedReceiver = null
            if(state.checkedReceiver && state.checkedReceiver.id === action.receiver.id){
                checkedReceiver = Object.assign({},state.checkedReceiver,action.receiver)
            }
            return Object.assign({},state,{receivers:_receivers,checkedReceiver})
        case REQUEST_RECEIVERS:
            return Object.assign({},state,{
                receiversFetching:true,
                receiversFetched:false
            })
        case RESPONSE_RECEIVERS:
            let receivers = null
            if(action.res.isFetched === true){
                receivers = action.res.result;
            }
            return Object.assign({},state,{
                receiversFetching:false,
                receiversFetched:action.res.isFetched,
                receivers
            })
        case START_DELETERECEIVER:
            return Object.assign({},state,{
                receiverDeleting:true,
                receiverDeleted:false
            })
        case FINISH_DELETERECEIVER:
            let receiverDeleted = action.res.receiverDeleted
            if(receiverDeleted){
                receivers = _.reject(receivers,(receiver)=>{
                    return receiver.id === action.param.id
                })
            }
            return Object.assign({},state,{
                receivers,
                receiverDeleting:false,
                receiverDeleted
            })
        case START_SETDEFAULT:
            return Object.assign({},state,{
                receiverUpdating:true,
                receiverUpdated:false
            })
        case FINISH_SETDEFAULT:
            let receiverUpdated = action.res.receiverUpdated
            if(receiverUpdated){
                receivers = _.map(receivers,(receiver)=>{
                    receiver.isDefault = 0
                    if(receiver.id === action.param.id){
                        receiver.isDefault = 1
                    }
                    return receiver
                })
                return Object.assign({},state,{
                    receivers,
                    receiverUpdated,
                    receiverUpdating:false
                })
            }
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    receiverByUser,
    updateReceiver,
    addReceiver
});

export default rootReducer;