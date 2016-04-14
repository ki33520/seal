'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/helper.es6";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import Loading from "../../common/loading.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";

class GoodList extends Component{
    beginRefresh(){
        const {index,category,trendy} = this.props;
        const {pageIndex,totalPage,id} = category;
        if(category.isFetching || totalPage <= pageIndex){
            return false;
        }
        this.props.fetchGoods({
            id,
            index,
            pageIndex:pageIndex + 1
        });
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    filterPrice(goods){
        if(goods.useMobilePrice&&goods.mobilePrice>0){
            return formatPrice(goods.mobilePrice);
        }else{
            return formatPrice(goods.salesPrice);
        }
    }
    renderGoods(list){
        if(list.length > 0){
            return list.map((goods,i)=>{
                const saleState = classNames({
                    "sale-out":goods.localStock<1&&goods.onSale,
                    "put-off":!goods.onSale
                });
                const salesPrice = this.filterPrice(goods);
                const originPrice = formatPrice(goods.originPrice);
                return (
                    <a href={jumpURL("gooddetail",[goods.singleCode])} className="clearfix" key={i}>
                        <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                        <Image src={goods.imageUrl} transitionName="fade" 
                        placeholder={()=><div className="trendy-placeholder"></div>}>
                        <div className={saleState}></div>
                        </Image>
                        </LazyLoad>
                        <div className="right">
                            <span className="name">{goods.title}</span>
                            <span className="country">
                                <i><img src={goods.sourceImageUrl} /></i>{goods.sourceName}
                            </span>
                            <span className="now-price">{'¥'+salesPrice}</span>
                            <span className="old-price">{'¥'+originPrice}</span>
                        </div>
                    </a>
                )
            })
        }else{
            return (
                <div className="empty">
                    <img src="/client/asset/images/empty_search.png" />
                    <span>暂无商品</span>
                </div>
            )
        }
    }
    render(){
        const {category,index} = this.props;
        const {isFetching,pageIndex} = category
        return (
             <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                <div className="activityGeneral">
                    {this.renderGoods(category.list)}
                </div>
                <Refresher active={pageIndex > 1 && isFetching}/>
                {pageIndex == category.totalPage?(<div className="no-more">已显示全部内容</div>):null}
                {index == 0?null:<Loading active={pageIndex == 1 && isFetching}/>}
            </GoTop>
        )
    }
}

export default GoodList;