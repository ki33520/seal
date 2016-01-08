'use strict';

import React,{Component} from "react";
import OrderItem from "./partial/orderitem.jsx";
import Header from "../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class OrderList extends Component{
    renderOrders(){
        const {pagination} = this.props;
        // console.log('pagination',pagination.list)
        if(pagination.result && pagination.result.length > 0){
            const orders = pagination.result.map((v,i)=>{
                const key = "order-item-" + i;
                return (
                    <OrderItem {...v} key={key}/>
                )
            })
            return orders
        }
        return null;
    }
    render(){
        console.log(this.props)
        return (
            <div className="order-list-content">
            <Header>我的订单</Header>
            <SlideTabs axis="x" navbarSlidable={false}>
                <SlideTabsItem navigator={()=><span>全部</span>} className="listMain">
                <div className="order-content">{this.renderOrders()}</div>
                </SlideTabsItem>
                <SlideTabsItem navigator={()=><span>待付款</span>} className="listMain">
                <div className="order-content">{this.renderOrders()}</div>
                </SlideTabsItem>
                <SlideTabsItem navigator={()=><span>待发货</span>} className="listMain">
                <div className="order-content">{this.renderOrders()}</div>
                </SlideTabsItem>
                <SlideTabsItem navigator={()=><span>待收货</span>} className="listMain">
                <div className="order-content">{this.renderOrders()}</div>
                </SlideTabsItem>
                <SlideTabsItem navigator={()=><span>待评价</span>} className="listMain">
                <div className="order-content">{this.renderOrders()}</div>
                </SlideTabsItem>
            </SlideTabs>
            </div>
        )
    }
}

export default OrderList;