'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import Floor from "./partial/floor.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Alert from "../../component/alert.jsx";
import Dialog from "../../component/dialog.jsx";
import {jumpURL,urlPrefix} from "../../lib/jumpurl.es6";

class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: props.ordersByParam.flag,
            dialogActive:false,
            dialogContent: "确定已收货吗?",
            dialogOnConfirm:null
        }
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        });
    }
    confirmDialog(orderNo,i){
        const {fetchDeliveryOrder} = this.props;
        this.setState({
            dialogActive:true,
            dialogContent: "确定已收货吗?",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                fetchDeliveryOrder(urlPrefix+"/deliveryorder",{
                    orderNo,
                    index: i
                });
            }
        });
    }
    componentWillReceiveProps(nextProps){
        const {alert} = this.props;
        if(nextProps.ordersByParam.deliveryOrderChanging === false &&
           this.props.ordersByParam.deliveryOrderChanging === true){
            if(nextProps.ordersByParam.deliveryOrderChanged === true){
                alert(nextProps.ordersByParam.msg,2000);
                window.location.assign(jumpURL("orderlist-id",[4]));
            }else{
                alert(nextProps.ordersByParam.msg,2000);
            }
        }
    }
    beginRefresh(interval,flag){
        const {fetchOrder} = this.props;
        const {orders,isFetching} =  this.props.ordersByParam;
        var flag = flag !== undefined ? flag: this.state.displayFlag,
            interval = interval !== undefined ? interval : 1,
            order = orders[flag],
            fetchLink = jumpURL("orderlist"),
            pageCount = 1,
            nextPage = 1;
        if(order && order.pageCount){
            pageCount = order.pageCount;
        }
        if(order && order.pageIndex){
            nextPage = order.pageIndex + interval;
        }
        if(pageCount < nextPage || isFetching){
            return false;
        }
        fetchOrder(fetchLink,{
            status: flag,
            pageIndex:nextPage
        });
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.ordersByParam.paygatewayFetched === false && this.props.ordersByParam.paygatewayFetched === true){
            setTimeout(()=>{
                document.getElementById("submitForm").submit();
            },10)
        }
    }
    toggleFlag(flag,e){
        e && e.preventDefault();
        const {orders} = this.props.ordersByParam;
        this.setState({
            displayFlag:flag
        });
        if(!orders[flag] || !orders[flag].list){
            this.beginRefresh(0,flag);
        }
    }
    handleLink(e){
        e && e.stopPropagation();
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    render(){
        var {orders,cashier,isFetching,alertActive,alertContent,cashierParam,flag} = this.props.ordersByParam;
        cashierParam = cashierParam || {};
        const tab_nav_item = ["全部","待付款","待发货","待收货","待评价"];
        return (
            <div className="order-list-content">
                <header className="header">
                    <a href={jumpURL("membercenter")} className="iconfont icon-back"></a>
                    <span className="title">我的订单</span>
                </header>
                <form action={cashier+"/cashier/v1/cashier"} method="POST" id="submitForm" ref="submitForm">
                    <input type="hidden" name="appId" value={cashierParam.appId} />
                    <input type="hidden" name="channel" value={cashierParam.channel} />
                    <input type="hidden" name="openId" value={cashierParam.openId} />
                    <input type="hidden" name="terminalType" value={cashierParam.terminalType} />
                    <input type="hidden" name="message" value={cashierParam.message} />
                    <input type="hidden" name="t" value={cashierParam.t} />
                    <input type="hidden" name="h" value={cashierParam.h} />
                </form>
                <div className="slide-tabs slide-tabs-fixed static-item">
                    <div className="slide-tabs-navbar">
                        {
                            tab_nav_item.map((v,k)=>{
                                const itemClass = classNames({
                                    "slide-tabs-navbar-item": true,
                                    "active": k===flag
                                });
                                return (
                                    <div key={k} className={itemClass}>
                                        <a href={jumpURL("orderlist-id",[k])}>{v}</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="slide-tabs-content slide-tabs-content-fixed">
                        {
                            tab_nav_item.map((v,k)=>{
                                const refresherActive = orders[k] && orders[k].isFetching || false;
                                const itemClass = classNames({
                                    "slide-tabs-item": true,
                                    "listMain": true,
                                    "active": k===flag
                                });
                                return (
                                    <div key={k} className={itemClass}>
                                        <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                                        <Floor orderIndex={k} confirmDialog={this.confirmDialog.bind(this)} {...this.props} />
                                        <Refresher active={refresherActive} />
                                        </GoTop>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Dialog active={this.state.dialogActive} 
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>{this.state.dialogContent}</Dialog>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderList;