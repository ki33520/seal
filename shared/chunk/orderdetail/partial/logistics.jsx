'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import GoTop from "../../../component/gotop.jsx";
import {jumpURL,urlPrefix} from "../../../lib/jumpurl.es6";

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
        fetchLogistics(urlPrefix+"/logistics",{
            orderNo:order.orderNo
        });
    }
    renderTrace(routes){
        if(routes.length>0){
            console.log(routes)
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
                    <div className="org-wuliuStatus org-starBg org-curBg">
                        <div className="org-wuLiuLeft">
                            <em className="org-middle"></em>
                        </div>
                        <p className="org-wuLiuFont org-wuLiuCur">
                            <span className="org-none">暂无物流动态信息</span>
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
                    <p>物流单号：{item.mailNumber}</p>
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
        const {currentRoute} = this.props;
        const {logistics,order,back_path} = this.props.orderByParam;
        console.log(logistics)
        const back_url = back_path === null ? null : jumpURL("orderlist-id",[back_path]);

        var content,
            parcel = [];
        for(var i in logistics){
            if(i === "dispatchs"){
                parcel = logistics[i];
            }
        }
        const cnNumbers = ["一","二","三","四","五","六","七","八","九"];
        const tabs = parcel.map((item,i)=>{
            return (
                <SlideTabsItem navigator={()=><i>{"包裹"+cnNumbers[i]}</i>} key={i}>
                    <GoTop relative={true}>
                    {this.renderContent(item)}
                    </GoTop>
                </SlideTabsItem>
            )
        });
        const slideTabs = (
            <SlideTabs axis="x" onSelect={this.handleClick.bind(this)} navbarSlidable={false}>
                {tabs}
            </SlideTabs>
        );
        if(parcel.length>0){
            content = slideTabs;
        }
        if(currentRoute === "logistics"){
            return (
                <div className="order-detail-content logistics-content">
                    <Header canBack={!back_url}>
                        {
                            back_url ? <a href={back_url} className="iconfont icon-back"></a> : back_url
                        }
                        <span className="title">物流信息</span>
                    </Header>
                    {content}
                </div>
            )
        }else{
            return null;
        }
    }
}

export default Logistics;