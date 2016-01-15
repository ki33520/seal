'use strict';

import React,{Component} from "react";
import classNames from "classnames";

import{
    SORT_NORMAL,SORT_PRICE,SORT_SALES,SORT_ASC,SORT_DESC
} from "../constant.es6";
 

class GoodSorter extends Component{
    changeParam(type){
        const {handleSort,params} = this.props;
        switch(type){
            case 'normal':
                params.sortType = SORT_NORMAL;
                break;
            case 'sales':
                params.sortType = SORT_SALES;
                break;
            case 'price':
                if(params.sortViewType===SORT_DESC){
                    params.sortViewType=SORT_ASC;
                }else{
                    params.sortViewType=SORT_DESC;
                }
                params.sortType = SORT_PRICE;
                break;
            default:
                break;
        }
        handleSort(params);
    }

    render(){
        const {sortType,sortViewType} = this.props.params;
 
        const normalClass=classNames('normal',{
            "active":sortType===SORT_NORMAL
        });
 
        const priceClass=classNames("price",{

            "active":sortType===SORT_PRICE && sortViewType === SORT_DESC,
            "price-asc":sortType===SORT_PRICE && sortViewType === SORT_ASC
        });

        const salesClass=classNames('sales',{
            "active":sortType===SORT_SALES
        });

        return (
            <div>
                <div className="search-order">
                    <a href="javascript:;" className={normalClass} onClick={this.changeParam.bind(this,'normal')}><i></i>默认</a>
                    <a href="javascript:;" className={priceClass}  onClick={this.changeParam.bind(this,'price')}><i></i>价格</a>
                    <a href="javascript:;" className={salesClass}  onClick={this.changeParam.bind(this,'sales')}><i></i>销量</a>
                </div>
            </div>
        )
    }
}


export default GoodSorter;