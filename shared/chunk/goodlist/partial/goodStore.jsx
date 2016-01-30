'use strict';

import React,{Component} from "react";
import classNames from "classnames";

import{
    SORT_NORMAL,SORT_PRICE,SORT_SALES,SORT_ASC,SORT_DESC
} from "../constant.es6";
 

class GoodSorter extends Component{
 
    sortDefault(){
        const {toggleSort} = this.props;
        
        toggleSort({
            sortType:SORT_NORMAL,
            sortViewType:SORT_DESC
        });
    }

    sortPrice(){
        let sortViewType =  this.props.params.sortViewType;
        sortViewType = sortViewType === SORT_ASC ? SORT_DESC :SORT_ASC;
        this.props.toggleSort({
            sortType:SORT_PRICE,
            sortViewType
        });
    }

    sortSales(){
        this.props.toggleSort({
            sortType:SORT_SALES,
            sortViewType:SORT_DESC
        });
    }

    render(){
        const {sortType,sortViewType} = this.props.params;
 
        const normalClass=classNames('normal',{
            "active":sortType===SORT_NORMAL
        });
        
        const priceClass=classNames("price",{
            "active":sortType===SORT_PRICE && sortViewType===SORT_DESC,
            "price-asc":sortType===SORT_PRICE && sortViewType===SORT_ASC
        });

        const salesClass=classNames('sales',{
            "active":sortType===SORT_SALES
        });

        return (
            <div>
                <div className="search-order">
                    <a href="javascript:;" className={normalClass} onClick={this.sortDefault.bind(this)}><i></i>默认</a>
                    <a href="javascript:;" className={priceClass}  onClick={this.sortPrice.bind(this)}><i></i>价格</a>
                    <a href="javascript:;" className={salesClass}  onClick={this.sortSales.bind(this)}><i></i>销量</a>
                </div>
            </div>
        )
    }
}


export default GoodSorter;