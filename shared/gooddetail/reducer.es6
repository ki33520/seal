'use strict';

import {combineReducers} from "redux";
import {RECEIVE_GOOD,REQUEST_GOOD,START_ADD_CART,FINISH_ADD_CART,
START_ADD_FAVORITE,FINISH_ADD_FAVORITE} from "./action.es6";

import {SHOW_ALERT,HIDE_ALERT} from "../common/action.es6";
import {alertReducer} from "../common/reducer.es6";

function goodById(state={},action){
    switch(action.type){
        case REQUEST_GOOD:
            return Object.assign({},state,{
                isFetching:true
            })
        case RECEIVE_GOOD:
            return Object.assign({},state,{
                isFetching:false,
                good:action.res
            })
        case START_ADD_FAVORITE:
            return Object.assign({},state,{
                favoriteAdding:true
            });
        case FINISH_ADD_FAVORITE:
            var favored = state.favored;
            if(action.res.code === "success"){
                favored = true
            }
            return Object.assign({},state,{
                favoriteAdding:false,
                favored
            })
        case SHOW_ALERT:
        case HIDE_ALERT:
            return alertReducer(state,action)
        default:
            return state;
    }
}

function cartByUser(state={},action){
    switch(action.type){
        case START_ADD_CART:
            return Object.assign({},state,{
                cartAdding:true
            });
        case FINISH_ADD_CART:
            var cartCount = state.cartCount === ""?0:state.cartCount;
            const buyed = action.param.qty;
            if(action.res.code === "success"){
                cartCount += buyed;
            }
            return Object.assign({},state,{
                cartAdding:false,
                cartCount
            })
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    goodById,
    cartByUser
});

export default rootReducer;