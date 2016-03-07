'use strict';

import React,{Component} from "react";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";

class OrderGoods extends Component{
    formatPrice(price){
        var _price = Number(price).toFixed(2).split('.');
        return <span><i className="price_a">{_price[0]}</i><i className="price_dot">.</i><i className="price_b">{_price[1]}</i></span>
    }
    renderGoods(){
        const {itemList} = this.props;
        if(itemList.length > 0){
            const goodItems = itemList.map((v,k)=>{
                return (
                    <div className="clearfix" key={k}>
                        <a className="J_ytag cartlist" href={"/gooddetail/"+v.singleCode}>
                            <span className="img_wrap">
                                <img src={v.singleImageUrl}/>
                            </span>
                        </a>
                        <div className="gd_info">
                            <p className="name">
                                <a href={"/gooddetail/"+v.singleCode}>
                                    <span>{v.singleTitle}</span>
                                </a>
                            </p>
                            <p className="value"><i>&yen;</i>{this.formatPrice(v.salesPrice)}<i className="x">&times;</i><b>{v.qty}</b></p>
                        </div>
                    </div>
                )
            })
            return goodItems;
        }
        return null;
    }
    render(){
        const {productFee,sendWareHouseName} = this.props;
        return (
            <div className="order-list">
                <div className="orderConfirm_l clearfix">
                    <div className="orderConfirm_l_box">
                        <div className="J_moveRight">
                        <div className="title">{sendWareHouseName}</div>
                        {this.renderGoods()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderGoods;