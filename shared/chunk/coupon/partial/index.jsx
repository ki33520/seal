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
        this.setState({
            activeIndex:index
        });
        if(coupons){
            return false;
        }
        this.fetchCouponsByParam(type,pageIndex);
    }
    beginRefresh(){
        const {pagination,couponType,isFetching} = this.props.index;
        const index = this.state.activeIndex;
        const type = couponType[index];
        const totalPage = pagination[type].totalPage;
        const pageIndex = Number(pagination[type].pageIndex);
        const nextPage = pageIndex + 1;
        if(totalPage < pageIndex||isFetching === true){
            return false;
        }
        this.fetchCouponsByParam(type,nextPage);
    }
    fetchCouponsByParam(couponType,nextPage){
        this.props.fetchCoupons({
            type:couponType,
            pageIndex:nextPage
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
                if(item.flag==='legue'){
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
        const beUsed = classNames({
            beUsed:invalid
        });

        let flag = coupon.flag;
        let classes = classNames("coupon",{
            "youa-invalid":invalid,
            "haitao":!invalid
        });

        return (
            <div className={classes} key={i}>
                <a href="javascript:;" onClick={this.props.changeScene.bind(this,"detail",{id:coupon.couponNo})}>
                    <div className="left">
                        <div className="price"><em>&yen;</em>{coupon.money}</div>
                        <div className="term">{coupon.songAccount}</div>
                    </div>
                    <div className="right">
                        <div className="kind">海外购www.tepin.hk</div>
                        <div className="date">{coupon.expiryDate}</div>
                        <div className="explain">{coupon.couponDesc}</div>
                    </div>
                    <div className={beUsed}></div>
                </a>
            </div>
        );
    }
    renderLegueCoupon(coupon,invalid,i){
        const classes = classNames("coupon",{
            "union-invalid":invalid,
            "union":!invalid
        });
        const expired = classNames({
            expired:invalid
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
                    <div className={expired}></div>
                </a>
            </div>
        );
    }
    render(){
        const {pagination,isFetching} = this.props.index;
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    <SlideTabsItem navigator={()=>'友阿优惠券'}>
                        <div>{this.renderYouaCoupons(pagination.youa.coupons)}</div>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'联盟优惠券'}>
                        <div>{this.renderLegueCoupons(pagination.legue.coupons)}</div>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'已失效优惠券'}>
                        <div>{this.renderInvalidCoupons(pagination.invalid.coupons)}</div>
                    </SlideTabsItem>
                </SlideTabs>
                <Refresher active={isFetching} handleRefresh={this.beginRefresh.bind(this)}/>
                <Loading active={isFetching}/>
            </div>
        )
    }
}

export default Coupon;