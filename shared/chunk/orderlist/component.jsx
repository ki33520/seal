'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";

import Floor from "./partial/floor.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Header from "../common/header.jsx";
import Alert from "../../component/alert.jsx";
import Dialog from "../../component/dialog.jsx";
import Loading from "../common/loading.jsx";
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
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs["slideTabs"]).children[0].children[this.state.displayFlag].click();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.ordersByParam.paygatewayFetched === false && this.props.ordersByParam.paygatewayFetched === true){
            setTimeout(()=>{
                ReactDOM.findDOMNode(this.refs["submitForm"]).submit();
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
        var {orders,isFetching,systemTime,alertActive,alertContent,cashierParam} = this.props.ordersByParam;
        cashierParam = cashierParam || {};
        const tab_nav_item = ["全部","待付款","待发货","待收货","待评价"];
        return (
            <div className="order-list-content">
                <header className="header">
                    <a href={jumpURL("membercenter")} className="iconfont icon-back"></a>
                    <span className="title">我的订单</span>
                </header>
                <form action="http://cashier.e9448.com/cashier/v1/cashier" method="POST" ref="submitForm">
                    <input type="hidden" name="appId" value={cashierParam.appId} />
                    <input type="hidden" name="channel" value={cashierParam.channel} />
                    <input type="hidden" name="openId" value={cashierParam.openId} />
                    <input type="hidden" name="terminalType" value={cashierParam.terminalType} />
                    <input type="hidden" name="message" value={cashierParam.message} />
                    <input type="hidden" name="t" value={cashierParam.t} />
                    <input type="hidden" name="h" value={cashierParam.h} />
                </form>
                <SlideTabs ref="slideTabs" axis="x" activeIndex={0} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)}>
                    {
                        tab_nav_item.map((v,k)=>{
                            var refresherActive = orders[k] && orders[k].isFetching || false;
                            return <SlideTabsItem key={k} navigator={()=><a onClick={this.handleLink.bind(this)} href={jumpURL("orderlist-id",[k])}>{v}</a>} className="listMain">
                                <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                                <Floor systemTime={systemTime} orderIndex={k} confirmDialog={this.confirmDialog.bind(this)} {...this.props} />
                                <Refresher active={refresherActive} />
                                </GoTop>
                            </SlideTabsItem>
                        })
                    }
                </SlideTabs>
                <Dialog active={this.state.dialogActive} 
                    onCancel={this.toggleDialog.bind(this)}
                    onConfrim={this.state.dialogOnConfirm}>{this.state.dialogContent}</Dialog>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default OrderList;