'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";
import {formatPrice,destPriceForGoods} from "../../lib/helper.es6";
import {jumpURL} from "../../lib/jumpurl.es6";
import Refresher from "../../component/refresher.jsx";
import GoTop from "../../component/gotop.jsx";
import LazyLoad from "../../component/lazyload/lazyload.jsx";
import Image from "../../component/lazyload/image.jsx";
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
        const {pageIndex} = this.state;
        const nextPage = pageIndex + 1;

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
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
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
                <a href={jumpURL("gooddetail",[item.singleCode])} className="clearfix" key={i}>
                    <div className={saleState}></div>
                    <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={item.imageUrl} transitionName="fade" placeholder={()=><div className="placeholder"></div>}/>
                    </LazyLoad>
                    <div className="right">
                        <span className="name">{item.title}</span>
                        <span className="country">
                        <i><img src={item.sourceImageUrl} /></i>
                        {item.sourceName}
                        </span>
                        <span className="nowPrice">{'¥'+salesPrice}</span>
                        <span className="oldPrice">{'¥'+originPrice}</span>
                    </div>
                </a>
            )
        });

        return (
            <div className="topic-content">
                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    <Header>{title}</Header>
                    <div className="flashBuy">
                    {goods}
                    </div>
                    <Refresher active={isFetching}/>
                    {this.state.pageIndex == totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                </GoTop>
            </div>
        )
    }
}

export default Topic