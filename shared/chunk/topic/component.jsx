'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../lib/util.es6";
import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";

class Topic extends Component{
    constructor(props){
        super(props);    
        this.state = {
            maskActive:false,
            shareActive:false,
            pageIndex:1
        }
    }
    beginRefresh(){
        const {dispatch,totalPage,isFetching} = this.props;
        let {pageIndex} = this.state;
        let nextPage = pageIndex + 1;

        if(isFetching || totalPage <= pageIndex){
            return false;
        }

        this.setState({
            pageIndex:nextPage
        });

        dispatch(fetchGoods(window.location.href,{
            pageIndex:nextPage
        }));
    }

    render(){
        const {isFetching,list,imageUrl,title,totalPage} = this.props;
        let goods = [];
 
        list.forEach(function(item,i){
            const salesPrice = formatPrice(destPriceForGoods(item).destPrice);
            const originPrice = formatPrice(item.originPrice);
            const saleState = classNames({
                "sale-out":item.localStock<1&&item.onSale,
                "put-off":!item.onSale
            });
            goods.push(
                <a href={"/gooddetail/"+item.singleCode} className="clearfix" key={i}>
                    <div className={saleState}></div>
                    <img src={item.imageUrl} />
                    <div className="right">
                        <span className="name">{item.title}</span>
                        <span className="country">
                        <i><img src={item.sourceImageUrl} alt="" /></i>
                        {item.sourceName}
                        </span>
                        <span className="nowPrice">&yen;{salesPrice}</span>
                        <span className="oldPrice">&yen;{originPrice}</span>
                    </div>
                </a>
            )
        });

        return (
            <div className="topic-content">
                <GoTop relative={true}>
                    <Header>{title}</Header>
                    <div className="flashBuy">
                    {goods}
                    </div>
                    <Refresher handleRefresh={this.beginRefresh.bind(this)} active={isFetching}/>
                    {this.state.pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                </GoTop>
            </div>
        )
    }
}

export default Topic