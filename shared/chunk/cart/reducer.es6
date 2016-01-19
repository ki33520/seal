'use strict';

import {combineReducers} from "redux";
import _ from "lodash";
import {START_UPDATE_CART,FINISH_UPDATE_CART,
    FINISH_DELETE_CART,FINISH_TOGGLE_CART,
FINISH_TOGGLE_ALL,FINISH_TOGGLE_NOT,
FINISH_QUERY_CART} from "./action.es6";

function cartByUser(state={},action){
    switch(action.type){
        case START_UPDATE_CART:
            return Object.assign({},state,{
                isFetching:true
            });

        case FINISH_UPDATE_CART:
            var carts = state.carts.slice();
            var {cartIndex,groupIndex,goodsIndex,number} = action.param;
            //var goods = carts[cartIndex].groupList[groupIndex].productList[goodsIndex];
            

            carts[cartIndex]=action.res.cart;
 
            return Object.assign({},state,{
                isFetching:false,
                carts
            });

        case FINISH_TOGGLE_CART:
            var carts = state.carts.slice();
            var {id,cartIndex,groupIndex,goodsIndex,checked} = action.param;
            var goods = carts[cartIndex].groupList[groupIndex].productList[goodsIndex];

            goods.checked = checked;

            if(checked){
                carts[cartIndex].itemIds.push(id);
                carts[cartIndex].buyeds.push(goods.number);
                carts[cartIndex].checked = carts[cartIndex].len === carts[cartIndex].itemIds.length;
            }else{
                var index = carts[cartIndex].itemIds.indexOf(id);
                carts[cartIndex].itemIds.splice(index,1);
                carts[cartIndex].buyeds.splice(index,1);
                carts[cartIndex].checked = false;
            }
            
            return Object.assign({},state,{
                isFetching:false,
                carts
            });


        case FINISH_DELETE_CART:
            var carts = state.carts.slice();
            var {cartIndex} = action.param;
            if(action.res.isFetched){
                carts[cartIndex]=action.res.cart;
                return Object.assign({},state,{
                    isFetching:false,
                    carts
                });
            }
            
        case FINISH_TOGGLE_ALL:
            var carts = state.carts.slice();
            var {cartIndex,checked} = action.param;
            carts[cartIndex].checked=checked;
            carts[cartIndex] =  action.res.cart;
            
            return Object.assign({},state,{
                isFetching:false,
                carts
            });

        case FINISH_TOGGLE_NOT:
            var carts = state.carts.slice();
            var {cartIndex,checked} = action.param;
            carts[cartIndex].checked=false;
            carts[cartIndex].itemIds=[];
            carts[cartIndex].buyeds=[];
            carts[cartIndex].number = 0;
            carts[cartIndex].pay = 0;
            carts[cartIndex].save = 0;
            carts[cartIndex].price = 0;
            carts[cartIndex].groupList.map((cart,i)=>{
                cart.productList.map((goods,j)=>{
                    goods.checked=false
                })
            })
            return Object.assign({},state,{
                carts
            });
        case FINISH_QUERY_CART:
            var {cartIndex} = action.param;
            var carts = state.carts.slice();
            carts[cartIndex] = action.res.carts;

            return Object.assign({},state,{
                carts
            });
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    cartByUser
})

export default rootReducer;