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
            sortType:SORT_NORMAL,
            sortViewType:SORT_ASC
        }
    }

    orderByDefault(){
        if(this.state.sortType===SORT_NORMAL){
            return false;
        }
        this.setState({
            sortType:SORT_NORMAL,
            sortViewType:SORT_ASC
        });
        this.props.toggleSort({
            sortType:SORT_NORMAL,
            sortViewType:SORT_DESC
        });
    }

    orderBySales(){
        if(this.state.sortType===SORT_SALES){
            return false;
        }
        this.setState({
            sortType:SORT_SALES,
            sortViewType:SORT_ASC
        });
        this.props.toggleSort({
            sortType:SORT_SALES,
            sortViewType:SORT_DESC
        });
    }

    orderByPrice(){
        this.setState({
            sortType:SORT_PRICE,
            sortViewType:this.state.sortViewType === SORT_ASC ? SORT_DESC : SORT_ASC
        });
        this.props.toggleSort({
            sortType:SORT_PRICE,
            sortViewType:this.state.sortViewType
        });
    }
 

    render(){
        
        const normalClass=classNames('normal',{
            "active":this.state.sortType===SORT_NORMAL
        });
 
        const priceClass=classNames("price",{
            "active":this.state.sortType===SORT_PRICE && this.state.sortViewType === SORT_DESC,
            "price-asc":this.state.sortType===SORT_PRICE && this.state.sortViewType === SORT_ASC
        });

        const salesClass=classNames('sales',{
            "active":this.state.sortType===SORT_SALES
        });

        return (
            <div>
                <div className="search-order">
                    <a href="javascript:;" className={normalClass} onClick={this.orderByDefault.bind(this)}><i></i>默认</a>
                    <a href="javascript:;" className={priceClass}  onClick={this.orderByPrice.bind(this)}><i></i>价格</a>
                    <a href="javascript:;" className={salesClass}  onClick={this.orderBySales.bind(this)}><i></i>销量</a>
                </div>
            </div>
        )
    }
}


export default GoodSorter;