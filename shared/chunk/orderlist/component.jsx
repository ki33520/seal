'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import util,{apiRequest} from "../../lib/util.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import fetchOrder from "./action.es6";

import Floor from "./partial/floor.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Header from "../common/header.jsx";


class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: 0
        }
    }
    componentDidMount(){
        util.registerPullDownEvent(()=>{
            this.beginRefresh(1);
        }.bind(this));
    }
    beginRefresh(interval,flag){
        const {orders,isFetching,dispatch} =  this.props;
        var flag = flag!= undefined ? flag: this.state.displayFlag,
            order = orders[flag],
            fetchLink = "/orderlist",
            pageCount = 1,
            nextPage = 1;
        if(order){
            pageCount = Math.ceil(order.totalCount/order.pageSize);
            nextPage = order.pageIndex + interval;
        };
        if(pageCount < nextPage || isFetching){
            return false;
        }
        dispatch(fetchOrder(fetchLink,{
            status: flag,
            pageIndex:nextPage
        }));
    }
    toggleFlag(flag,e){
        e && e.preventDefault();
        const {orders} = this.props;
        this.setState({
            displayFlag:flag
        });
        if(!orders[flag]){
            this.beginRefresh(0,flag);
        }
    }
    render(){
        var {orders,isFetching} = this.props;
        return (
            <div className="order-list-content">
                <Header>我的订单</Header>
                <SlideTabs axis="x" activeIndex={this.state.displayFlag} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)}>
                    <SlideTabsItem navigator={()=><span>全部</span>} className="listMain">
                        <Floor orderItem={orders[0]} ref="floor"/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待付款</span>} className="listMain">
                        <Floor orderItem={orders[1]} ref="floor"/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待发货</span>} className="listMain">
                        <Floor orderItem={orders[2]} ref="floor"/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待收货</span>} className="listMain">
                        <Floor orderItem={orders[3]} ref="floor"/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待评价</span>} className="listMain">
                        <Floor orderItem={orders[4]} ref="floor"/>
                    </SlideTabsItem>
                </SlideTabs>
                <Refresher active={isFetching} />
                <GoTop />
            </div>
        )
    }
}

export default OrderList;