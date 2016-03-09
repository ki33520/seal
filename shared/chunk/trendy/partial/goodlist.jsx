'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/util.es6";
class GoodList extends Component{
    filterPrice(goods){
        if(goods.useMobilePrice&&goods.mobilePrice>0){
            return formatPrice(goods.mobilePrice);
        }else{
            return formatPrice(goods.salesPrice);
        }
    }
    renderGoods(){
        const {list} = this.props.category;
        if(list.length > 0){
            return list.map((goods,i)=>{
                const soldOut = classNames({
                    "sale-out":goods.localStock>0?false:true
                });
                const saleIcon = classNames({
                    "mobile-price":goods.useMobilePrice
                });
                const salesPrice = this.filterPrice(goods);
                const originPrice = formatPrice(goods.originPrice);
                return (
                    <a href={"/gooddetail/"+goods.singleCode} className="clearfix" key={i}>
                        <div className={soldOut}></div>
                        <div className={saleIcon}></div>
                        <img src={goods.imageUrl}/>
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
        }
        return '暂无商品';
    }
    render(){
        return (
            <div className="activityGeneral">
            {this.renderGoods()}
            </div>
        )
    }
}

export default GoodList;