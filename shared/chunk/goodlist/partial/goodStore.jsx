'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {SORT_NORMAL,SORT_PRICE_DESC,SORT_PRICE_ASC,SORT_SALES} from "../action.es6";

class GoodSorter extends Component{

    render(){
        const {orderBy,sortType} = this.props;
  
        const normalClass=classNames('normal',{
            "active":sortType===SORT_NORMAL,
        });

        const priceClass=classNames('price',{
            "active":sortType===SORT_PRICE_DESC,
            "price-asc":sortType===SORT_PRICE_ASC
        });

        const salesClass=classNames('sales',{
            "active":sortType===SORT_SALES,
        });

        return (
            <div>
                <div className="search-order">
                    <a href="javascript:void(0);" className={normalClass} onClick={orderBy.bind(this,SORT_NORMAL)}><i></i>默认</a>
                    <a href="javascript:void(0);" className={priceClass}  onClick={orderBy.bind(this,SORT_PRICE_DESC)}><i></i>价格</a>
                    <a href="javascript:void(0);" className={salesClass}  onClick={orderBy.bind(this,SORT_SALES)}><i></i>销量</a>
                </div>
            </div>
        )
    }
}

export default GoodSorter;