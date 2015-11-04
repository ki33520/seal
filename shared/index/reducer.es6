'use strict';

import {
    CHANGE_FIELD,
    REQUEST_WEATHER,
    RESPONSE_WEATHER
} from "./action.es6";
import {combineReducers} from "redux";

function weatherByCityName(state={},action){
    switch(action.type){
        case CHANGE_FIELD:
            const {name,value} = action;
            var weather = {...state.weather};
            weather[name] = value;
            return Object.assign({},state,{
                weather
            });
        case REQUEST_WEATHER:
            return Object.assign({},state,{
                weatherFetched:false,
                weatherFetching:true
            });
        case RESPONSE_WEATHER:
            const weather = action.res.result;
            const weatherFetched = action.res.weatherFetched;
            return Object.assign({},state,{
                weather,
                weatherFetched,
                weatherFetching:false
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    weatherByCityName
});

export default rootReducer;