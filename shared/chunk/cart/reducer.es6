'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {START_UPDATE_CART,FINISH_UPDATE_CART,
START_FETCH_CART,FINISH_FETCH_CART} from "./action.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                cartUpdating:true,
                cartUpdated:false
            })
        case FINISH_UPDATE_CART:
            var cartUpdated = false;
            if(action.res.cartUpdated === true){
                cartUpdated = true;
            }
            return Object.assign({},state,{
                cartUpdating:false,
                cartUpdated
            })
        case START_FETCH_CART:
            return Object.assign({},state,{
                cartFetching:true,
                cartFetched:false
            })
        case FINISH_FETCH_CART:
            var carts = action.res.object;
            return Object.assign({},state,{
                cartFetching:false,
                cartFetched:true,
                carts
            })

        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;