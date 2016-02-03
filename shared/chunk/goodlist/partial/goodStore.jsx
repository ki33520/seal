'use strict';

import React,{Component} from "react";
import classNames from "classnames";

import{
    SORT_NORMAL,SORT_PRICE,SORT_SALES,SORT_ASC,SORT_DESC
} from "../constant.es6";
 

class GoodSorter extends Component{
    constructor(props){
        super(props);
        this.state = {
            viewType:SORT_DESC,
            sortType:SORT_NORMAL
        }
    }
    sortBy(type){
        const {toggleSort} = this.props
        switch(type){
            case SORT_NORMAL:
                toggleSort({
                    sortType:SORT_NORMAL,
                    viewType:SORT_DESC
                });
                break;
            case SORT_PRICE:
                toggleSort({
                    sortType:SORT_PRICE,
                    viewType:this.state.viewType
                });
                break;
            case SORT_SALES:
                toggleSort({
                    sortType:SORT_SALES,
                    viewType:SORT_DESC
                });
                break;
        }
        this.setState({
            viewType:!this.state.viewType,
            sortType:type
        });
    }
    render(){
        const {sortType,viewType} = this.state;
        const normal=classNames('normal',{
            "active":sortType===SORT_NORMAL
        });
        const price=classNames("price",{
            "active":sortType===SORT_PRICE && viewType===SORT_DESC,
            "price-asc":sortType===SORT_PRICE && viewType===SORT_ASC
        });
        const sales=classNames('sales',{
            "active":sortType===SORT_SALES
        });
        return (
            <div>
                <div className="search-order">
                    <a href="javascript:;" className={normal} onClick={this.sortBy.bind(this,SORT_NORMAL)}><i></i>默认</a>
                    <a href="javascript:;" className={price}  onClick={this.sortBy.bind(this,SORT_PRICE)}><i></i>价格</a>
                    <a href="javascript:;" className={sales}  onClick={this.sortBy.bind(this,SORT_SALES)}><i></i>销量</a>
                </div>
            </div>
        )
    }
}


export default GoodSorter;