'use strict';
import React,{Component} from "react";
import classNames from "classnames";
import {formatPrice} from "../../../lib/util.es6";
class GoodList extends Component{
    filterPrice(flash,mobile,salse){
        console.log(flash)
        if(flash && flash > 0){
            return formatPrice(flash);
        }else if(mobile && mobile > 0){
            return formatPrice(mobile);
        }else{
            return formatPrice(salse);
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
                    "flash-price":goods.flashPrice>0?true:false,
                    "mobile-price":goods.mobilePrice>0?true:false
                });
                const salesPrice = this.filterPrice(goods.flashPrice,goods.mobilePrice,goods.salesPrice);
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
                            <span className="now-price">&yen;{salesPrice}</span>
                            <span className="old-price">&yen;{originPrice}</span>
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