'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {
    SORT_NORMAL,SORT_PRICE,SORT_SALES,SORT_ASC,SORT_DESC
} from "../sortTypes.es6"
 

class GoodSorter extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderByType:SORT_NORMAL
        }
    }

    handleClick(type){
         
        switch(type){
            case SORT_NORMAL:
                this.setState({
                    orderByType:SORT_NORMAL
                });
                this.props.orderBy({
                    sortType:SORT_NORMAL
                });
                break;
            case SORT_SALES:
                this.setState({
                    orderByType:SORT_SALES
                });
                this.props.orderBy({
                    sortType:SORT_SALES
                });
                break;
            case SORT_PRICE:
                if(this.state.orderByType===SORT_DESC){
                    this.setState({
                        orderByType:SORT_ASC
                    });
                    this.props.orderBy({
                        sortType:SORT_PRICE,
                        viewType:SORT_ASC
                    });
                }else{
                    this.setState({
                        orderByType:SORT_DESC
                    });
                    this.props.orderBy({
                        sortType:SORT_PRICE,
                        viewType:SORT_DESC
                    });
                }
                
                break;
            default:
                break;
        }
    }

    render(){
        
        const normalClass=classNames('normal',{
            "active":this.state.orderByType===SORT_NORMAL,
        });
 
        const priceClass=classNames('price',{
            "active":this.state.orderByType===SORT_DESC,
            "price-asc":this.state.orderByType === SORT_ASC
        });

        const salesClass=classNames('sales',{
            "active":this.state.orderByType===SORT_SALES,
        });

        return (
            <div>
                <div className="search-order">
                    <a href="javascript:;" className={normalClass} onClick={this.handleClick.bind(this,SORT_NORMAL)}><i></i>默认</a>
                    <a href="javascript:;" className={priceClass}  onClick={this.handleClick.bind(this,SORT_PRICE)}><i></i>价格</a>
                    <a href="javascript:;" className={salesClass}  onClick={this.handleClick.bind(this,SORT_SALES)}><i></i>销量</a>
                </div>
            </div>
        )
    }
}


export default GoodSorter;