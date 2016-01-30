'use strict';

import React,{Component} from "react";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";

class OrderGoods extends Component{
    renderGoods(){
        const {itemList} = this.props;
        if(itemList.length > 0){
            const goodItems = itemList.map((good,i)=>{
                const key = "group-" + i
                return (
                    <div className="clearfix" key={key}>
                        <a className="img_wrap J_ytag cartlist" href={"/gooddetail/"+good.singleCode}>
                            <img src={good.singleImageUrl}/>
                        </a>
                        <div className="gd_info">
                            <p className="name">
                                <a href={"/gooddetail/"+good.singleCode}>
                                    <span>{good.singleTitle}</span>
                                </a>
                            </p>
                            <p className="value"><i>&yen;</i><span>{good.salesPrice.toFixed(2)}</span><i>X</i><b>{good.qty}</b></p>
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
            <div className="orderConfirm_l clearfix">
                <div className="orderConfirm_l_box">
                    <div className="J_moveRight">
                    <div className="title">{sendWareHouseName}</div>
                    {this.renderGoods()}
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderGoods;