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
            type:SORT_NORMAL,
            order:SORT_ASC
        }
    }

    orderByDefault(){
        if(this.state.type===SORT_NORMAL){
            return false;
        }
        this.setState({
            type:SORT_NORMAL,
            order:SORT_ASC
        });
        this.props.orderBy({
            type:SORT_NORMAL,
            order:SORT_DESC
        });
    }

    orderBySales(){
        if(this.state.type===SORT_SALES){
            return false;
        }
        this.setState({
            type:SORT_SALES,
            order:SORT_ASC
        });
        this.props.orderBy({
            type:SORT_SALES,
            order:SORT_DESC
        });
    }

    orderByPrice(){
        this.setState({
            type:SORT_PRICE,
            order:this.state.order === SORT_ASC ? SORT_DESC : SORT_ASC
        });
        this.props.orderBy({
            type:SORT_PRICE,
            order:this.state.order
        });
    }
 

    render(){
        
        const normalClass=classNames('normal',{
            "active":this.state.type===SORT_NORMAL
        });
 
        const priceClass=classNames("price",{
            "active":this.state.type===SORT_PRICE && this.state.order === SORT_DESC,
            "price-asc":this.state.type===SORT_PRICE && this.state.order === SORT_ASC
        });

        const salesClass=classNames('sales',{
            "active":this.state.type===SORT_SALES
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