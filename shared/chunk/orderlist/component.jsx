'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import GoTop from "../../component/gotop.jsx";
import Refresher from "../../component/refresher.jsx";
import {fetchOrder,fetchDeliveryOrder} from "./action.es6";

import Floor from "./partial/floor.jsx";
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";
import Header from "../common/header.jsx";
import {alert} from "../common/action.es6";
import Alert from "../../component/alert.jsx";
import Dialog from "../../component/dialog.jsx";


class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayFlag: props.flag,
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
        const {dispatch} = this.props;
        this.setState({
            dialogActive:true,
            dialogContent: "确定已收货吗?",
            dialogOnConfirm:()=>{
                this.toggleDialog();
                dispatch(fetchDeliveryOrder("/deliveryorder",{
                    orderNo,
                    index: i
                }));
            }
        });
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
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs["slideTabs"]).children[1].children[this.state.displayFlag].click();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.paygatewayFetched === false && this.props.paygatewayFetched === true){
            setTimeout(()=>{
                ReactDOM.findDOMNode(this.refs["submitForm"]).submit();
            },1000)
        }
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
        var {orders,isFetching,systemTime,alertActive,alertContent,cashierParam} = this.props;
        cashierParam = cashierParam || {};
        const tab_nav_item = ["全部","待付款","待发货","待收货","待评价"];
        return (
            <div className="order-list-content">
                <header className="header">
                    <a href="/membercenter" className="iconfont icon-back"></a>
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
                            return <SlideTabsItem key={k} navigator={()=><a href={"/orderlist/"+k}>{v}</a>} className="listMain">
                                <Floor systemTime={systemTime} orderIndex={k} confirmDialog={this.confirmDialog.bind(this)} {...this.props} />
                                <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)} />
                                <GoTop relative={true}/>
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