'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Refresher from "../../../component/refresher.jsx";
import Loading from "../../common/loading.jsx";

class Coupon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    handleClick(index){
        const {pagination,couponType} = this.props.index;
        const type = couponType[index];
        const {coupons,pageIndex,totalPage} = pagination[type];
        const _pageIndex = pageIndex || 1;
        this.setState({
            activeIndex:index
        });
        if(coupons){
            return false;
        }
        this.fetchCouponsByParam(type,_pageIndex,true);
    }
    beginRefresh(){
        const {pagination,couponType,isFetching} = this.props.index;
        const index = this.state.activeIndex;
        const type = couponType[index];
        const totalPage = pagination[type].totalPage;
        const pageIndex = Number(pagination[type].pageIndex);
        const nextPage = pageIndex + 1;
        if(totalPage <= pageIndex||isFetching === true){
            return false;
        }
        this.fetchCouponsByParam(type,nextPage,false);
    }
    fetchCouponsByParam(couponType,pageIndex,isLoading){
        this.props.fetchCoupons({
            type:couponType,
            pageIndex,
            isLoading
        });
    }
    renderYouaCoupons(coupons){
        if(coupons && coupons.length){
            return coupons.map((item,i)=>{
                return this.renderYouaCoupon(item,false,'y-'+i);
            });
        }else{
            return this.renderNoCoupon("您目前没有友阿优惠券哟！");
        }
    }
    renderLegueCoupons(coupons){
        if(coupons && coupons.length){
            return coupons.map((item,i)=>{
                return this.renderLegueCoupon(item,false,'l-'+i);
            });
        }else{
            return this.renderNoCoupon("您目前没有联盟优惠券哟！");
        }
    }  
    renderInvalidCoupons(coupons){
        if(coupons && coupons.length){
            return coupons.map((item,i)=>{
                if(item.flag.value==='legue'){
                    return this.renderLegueCoupon(item,true,'il-'+i);
                }else{
                    return this.renderYouaCoupon(item,true,'iy-'+i);
                }
            });
        }else{
            return this.renderNoCoupon("您目前没有失效优惠券哟！");
        }
    }
    renderNoCoupon(message){
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_coupon.png" />
                <span>{message}</span>
            </div>
        )
    }
    renderYouaCoupon(coupon,invalid,i){
        const classes = classNames("coupon",{
            "youa-invalid":invalid,
            "haitao":!invalid && coupon.flag.value==='haitao',
            "tepin":!invalid && coupon.flag.value==='tepin',
            "hnmall":!invalid && coupon.flag.value==='hnmall',
            "general":!invalid && coupon.flag.value===undefined,
        });
        const status = classNames({
            used:coupon.used,
            expired:coupon.expired
        });
        return (
            <div className={classes} key={i}>
                <a href="javascript:;" onClick={this.props.changeScene.bind(this,"detail",{id:coupon.couponNo})}>
                    <div className="left">
                        <div className="price"><em>&yen;</em>{coupon.money}</div>
                        <div className="term">{coupon.songAccount}</div>
                    </div>
                    <div className="right">
                        <div className="kind">{coupon.flag.title}</div>
                        <div className="date">{coupon.expiryDate}</div>
                        <div className="explain">{coupon.couponDesc}</div>
                    </div>
                    <div className={status}></div>
                </a>
            </div>
        );
    }
    renderLegueCoupon(coupon,invalid,i){
        const classes = classNames("coupon",{
            "union-invalid":invalid,
            "union":!invalid
        });
        const status = classNames({
            used:coupon.used,
            expired:coupon.expired
        });

        return (
            <div className={classes} key={i}>
                <a href="javascript:;" onClick={this.props.changeScene.bind(this,"detail",{id:coupon.couponNo})}>
                    <div className="content">
                        <div className="left">
                            <div className="price">{coupon.shortName}</div>
                        </div>
                        <div className="right">
                            <div className="company">{coupon.couponName}</div>
                            <div className="explain">{coupon.description}</div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="term">{coupon.useRules}</div>
                        <div className="date">{coupon.expiryDate}</div>
                    </div>
                    <div className={status}></div>
                </a>
            </div>
        );
    }
    render(){
        const {pagination,isFetching,isLoading} = this.props.index;
        return (
            <div className="inner-scroll">
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    <SlideTabsItem navigator={()=>'友阿优惠券'}>
                        {this.renderYouaCoupons(pagination.youa.coupons)}
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'联盟优惠券'}>
                        {this.renderLegueCoupons(pagination.legue.coupons)}
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)}/>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'已失效优惠券'}>
                        {this.renderInvalidCoupons(pagination.invalid.coupons)}
                        <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)}/>
                    </SlideTabsItem>
                </SlideTabs>
                <Loading active={isLoading}/>
            </div>
        )
    }
}

export default Coupon;