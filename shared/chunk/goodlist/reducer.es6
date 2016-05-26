'use strict'
import {combineReducers} from "redux";
import _ from "lodash";

import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,TOGGLE_SORTED,TOGGLE_HAVE_GOODS,
    TOGGLE_RESET_FILTER
} from "./constant.es6";

import {search} from "../common/reducer.es6";
 
function index(state={},action){
    switch(action.type){
        case START_FETCH_GOODS:
            return Object.assign({},state,{
                isFetching:true,
                isFetched:false
            });
        case FINISH_FETCH_GOODS:
            var {goodsList,pageIndex,totalPage} = action.res;
            if(pageIndex>1){
                let stateList = [...state.goodsList];
                goodsList = stateList.concat(goodsList);
            }
            return Object.assign({},state,{
                isFetching:false,
                isFetched:action.res.isFetched,
                goodsList,
                totalPage,
                pageIndex
            });
        case TOGGLE_SORTED:
            return Object.assign({},state,{
                sortType:action.param.sortType,
                viewType:action.param.viewType
            });
        case TOGGLE_HAVE_GOODS:
            return Object.assign({},state,{
                isHaveGoods:action.param.isHaveGoods
            });
        case TOGGLE_RESET_FILTER:
            var {filter,pageIndex,isHaveGoods} = action.param;
            var _filter = [...filter];
            _filter.forEach((obj,i)=>{
                let _obj = {...obj};
                let list = [...obj.list];
                list.forEach((item,j)=>{
                    let _item = {...item};
                    _item.isChecked = false;
                    list[j]=_item;
                });
                _obj.list = list;
                _filter[i]=_obj;
            })
            return Object.assign({},state,{
                pageIndex,
                isHaveGoods,
                filter:_filter
            });
        case TOGGLE_CHECKED:
            var {filter,filterIndex,itemIndex} = action.param;
            var _filter = [...filter];
            var obj = {..._filter[filterIndex]};
            var list = [...obj.list];
            list.forEach((item,i)=>{
                if(itemIndex===i){
                    let _item = {...item};
                    _item.isChecked = !item.isChecked;
                    list[i]=_item;
                }
            });
            obj.list = list;
            _filter[filterIndex]=obj;
            return Object.assign({},state,{
                filter:_filter
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    index,search
});

export default rootReducer;
