'use strict';

import React,{Component} from "react";
import OrderItem from "./partial/orderitem.jsx";
import Header from "../common/header.jsx";

class OrderList extends Component{
    renderOrders(){
        const {pagination} = this.props;
        if(pagination.list.length > 0){
            const orders = pagination.list.map((v,i)=>{
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
        return (
            <div className="order-list-content">
            <Header title="订单列表"/>
            <div className="order-list">{this.renderOrders()}</div>
            </div>
        )
    }
}

export default OrderList;