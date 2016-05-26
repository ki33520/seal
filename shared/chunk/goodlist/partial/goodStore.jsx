'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import{
    SORT_NORMAL,SORT_PRICE,SORT_SALES,SORT_ASC,SORT_DESC
} from "../constant.es6";
 

class GoodSorter extends Component{
    constructor(props){
        super(props);
    }
    sortBy(type){
        const {toggleSort,viewType} = this.props
        switch(type){
            case SORT_NORMAL:
                toggleSort({
                    sortType:type,
                    viewType:SORT_DESC
                });
                break;
            case SORT_PRICE:
                toggleSort({
                    sortType:type,
                    viewType:!viewType
                });
                break;
            case SORT_SALES:
                toggleSort({
                    sortType:type,
                    viewType:SORT_DESC
                });
                break;
        }
    }
    render(){
        const {sortType,viewType} = this.props;
        const normal=classNames('normal',{
            "active":sortType===SORT_NORMAL
        });
        const price=classNames("price",{
            "active":sortType===SORT_PRICE && viewType===SORT_ASC,
            "price-desc":sortType===SORT_PRICE && viewType===SORT_DESC
        });
        const sales=classNames('sales',{
            "active":sortType===SORT_SALES
        });
        return (
            <div className="search-order">
                <a href="javascript:;" className={normal} onClick={this.sortBy.bind(this,SORT_NORMAL)}><i></i>默认</a>
                <a href="javascript:;" className={price}  onClick={this.sortBy.bind(this,SORT_PRICE)}><i></i>价格</a>
                <a href="javascript:;" className={sales}  onClick={this.sortBy.bind(this,SORT_SALES)}><i></i>销量</a>
            </div>
        )
    }
}

GoodSorter.defaultProps = {
    sortType:SORT_NORMAL,
    viewType:SORT_DESC
}

export default GoodSorter;
