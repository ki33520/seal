'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import fetchOrder from "./action.es6";

import Floor from "./partial/floor.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Header from "../common/header.jsx";
import {alert} from "../common/action.es6";
import Alert from "../../component/alert.jsx";


class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: props.flag
        }
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;
        if(nextProps.deliveryOrderChanging === false &&
           this.props.deliveryOrderChanging === true){
            if(nextProps.deliveryOrderChanged === true){
                dispatch(alert(nextProps.msg,2000));
            }else{
                dispatch(alert(nextProps.msg,2000));
            }
        }
    }
    beginRefresh(interval,flag){
        const {orders,isFetching,dispatch} =  this.props;
        var flag = flag !== undefined ? flag: this.state.displayFlag,
            interval = interval !== undefined ? interval : 1,
            order = orders[flag],
            fetchLink = "/orderlist",
            pageCount = 1,
            nextPage = 1;
        if(order){
            pageCount = order.pageCount;
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
        var {orders,isFetching,systemTime,alertActive,alertContent} = this.props;
        return (
            <div className="order-list-content">
                <Header>我的订单</Header>
                <SlideTabs axis="x" activeIndex={this.state.displayFlag} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)}>
                    <SlideTabsItem navigator={()=><span>全部</span>} className="listMain">
                        <Floor systemTime={systemTime} orderItem={orders[0]} {...this.props} ref="floor"/>
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                        <GoTop relative={true}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待付款</span>} className="listMain">
                        <Floor systemTime={systemTime} orderItem={orders[1]} {...this.props} ref="floor"/>
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                        <GoTop relative={true}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待发货</span>} className="listMain">
                        <Floor systemTime={systemTime} orderItem={orders[2]} {...this.props} ref="floor"/>
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                        <GoTop relative={true}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待收货</span>} className="listMain">
                        <Floor systemTime={systemTime} orderItem={orders[3]} {...this.props} ref="floor"/>
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                        <GoTop relative={true}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=><span>待评价</span>} className="listMain">
                        <Floor systemTime={systemTime} orderItem={orders[4]} {...this.props} ref="floor"/>
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                        <GoTop relative={true}/>
                    </SlideTabsItem>
                </SlideTabs>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderList;