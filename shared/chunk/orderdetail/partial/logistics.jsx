'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import StatusProgress from "./statusprogress.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";

import {fetchLogistics} from "../action.es6";

class Logistics extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    componentDidMount(){
        const {fetchLogistics} = this.props;
        const {order} = this.props.orderByParam;
        fetchLogistics("/logistics",{
            orderNo:order.orderNo
        });
    }
    renderTrace(routes){
        if(routes.length>0){
            return (
                <div className="org-wuliuStatusList">
                    {
                        routes.map((v,k)=>{
                            const classes = classNames({
                                "org-wuliuStatus":true,
                                "org-curBg": k===0,
                                "org-midBg": k!==0 || k!==(routes.length-1),
                                "org-starBg": k===(routes.length-1)
                            });
                            return (
                                <div className={classes} key={k}>
                                    <div className="org-wuLiuLeft">
                                        <em className="org-middle"></em>
                                    </div>
                                    <p className="org-wuLiuFont org-wuLiuCur">
                                        <span>{v.context}</span>
                                        <span className="org-wuLiuTime">{v.eventTime}</span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }else{
            return (
                <div className="org-wuliuStatusList">
                    <div className="org-wuliuStatus org-curBg">
                        <div className="org-wuLiuLeft">
                            <em className="org-middle"></em>
                        </div>
                        <p className="org-wuLiuFont org-wuLiuCur">
                            <span>暂无物流动态信息</span>
                        </p>
                    </div>
                </div>
            )
        }
    }
    handleClick(index){

    }
    renderContent(item){
        return (
            <div className="logistics page-0 page-current">
                <div className="info">
                    <h2>物流详情</h2>
                    <p><i>物流公司：</i>{item.expressName}</p>
                    <p>物流编号：{item.mailNumber}</p>
                </div>
                
                <div className="rate">
                    <h2>物流动态</h2>
                    {this.renderTrace(item.routes)}
                    <h2 className="source">信息来源：{item.expressName}</h2>
                </div>
                
            </div>
        )
    }
    render(){
        const {logistics,order} = this.props.orderByParam;
        var parcel = [];
        for(var i in logistics){
            if(i === "dispatchs"){
                parcel = logistics[i];
            }
        }
        const tabs = parcel.map((item,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{"包裹"+i}</i>} key={i}>
                    {this.renderContent(item)}
                </SlideTabsItem>
            )
        })
        return (
            <div className="order-detail-content logistics-content">
                <Header>物流信息</Header>
                <SlideTabs axis="x" onSelect={this.handleClick.bind(this)}>
                    {tabs}
                </SlideTabs>
            </div>
        )
    }
}

export default Logistics;