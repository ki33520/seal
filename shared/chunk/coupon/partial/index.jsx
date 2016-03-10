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
                return this.renderYouaCoupon(item,'y-'+i);
            });
        }else{
            return this.renderNoCoupon("您目前没有友阿优惠券哟！");
        }
    } 
    renderInvalidCoupons(coupons){
        if(coupons && coupons.length){
            return coupons.map((item,i)=>{
                return this.renderYouaCoupon(item,'iy-'+i);
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
    renderYouaCoupon(coupon,i){
        const canUse = !(coupon.used || coupon.expiried);
        const row = classNames("coupon",{
            "youa-invalid":!canUse,
            "haitao":canUse
        });
        const status = classNames({
            used:coupon.used,
            expiried:coupon.expiried
        });
        return (
            <div className={row} key={i}>
                    <div className="left">
                        <div className="price"><em>&yen;</em>{coupon.money}</div>
                        <div className="term">{'满'+coupon.songAccount+'使用'}</div>
                    </div>
                    <div className="right">
                        <div className="kind">{coupon.flag}</div>
                        <div className="date">{coupon.expiryDate}</div>
                        <div className="explain">{coupon.couponDesc}</div>
                    </div>
                    <div className={status}></div>
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
                    <SlideTabsItem navigator={()=>'未使用优惠券'}>
                        {this.renderYouaCoupons(pagination.youa.coupons)}
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