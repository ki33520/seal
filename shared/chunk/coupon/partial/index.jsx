'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Refresher from "../../../component/refresher.jsx";
import Loading from "../../common/loading.jsx";
import GoTop from "../../../component/gotop.jsx";

class Coupon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    handleClick(index){
        const {coupons,isFetching} = this.props.index;
        const {pageIndex} = coupons[index];
        this.setState({
            activeIndex:index
        });
        if(isFetching||pageIndex>1){
            return false;
        }
        this.fetchCouponsByParam(index,pageIndex);
    }
    beginRefresh(){
        const {coupons,isFetching} = this.props.index;
        const index = this.state.activeIndex;
        const {totalPage,pageIndex} = coupons[index];
        if(isFetching||totalPage <= pageIndex){
            return false;
        }
        this.fetchCouponsByParam(index,pageIndex+1);
    }
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    fetchCouponsByParam(index,pageIndex){
        this.props.fetchCoupons({
            index,
            pageIndex
        });
    }
    renderCoupons(coupons){
        const {list,title} = coupons;
        if(list && list.length>0){
            return list.map((item,i)=>{
                return this.renderCoupon(item,i);
            });
        }else{
            return this.renderNoCoupon(title);
        }
    } 
    renderNoCoupon(title){
        let message = null;
        if(title==='未使用优惠券'){
            message = '您目前没有友阿优惠券哦！';
        }else{
            message = '您目前没有未使用的优惠券哦！';
        }
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_coupon.png" />
                <span>{message}</span>
            </div>
        )
    }
    renderCoupon(coupon,key){
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
            <div className={row} key={key}>
                <div className="left">
                    <div className="price"><em>&yen;</em>{coupon.money}</div>
                    <div className="term">{'满'+coupon.songAccount+'使用'}</div>
                </div>
                <div className="right">
                    <div className="kind">{coupon.flag}</div>
                    <div className="date">{coupon.expiryDate}</div>
                    <div className="explain">{coupon.description}</div>
                </div>
                <div className={status}></div>
            </div>
        );
    }
    render(){
        const {coupons,isFetching} = this.props.index;
        const items = coupons.map((item,i)=>{
            return (
                <SlideTabsItem navigator={()=>item.title} key={i}>
                    <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    {this.renderCoupons(item)}
                    <Refresher active={isFetching}/>
                    <Loading active={item.list.length===0&&isFetching}/>
                    {item.pageIndex == item.totalPage?(<div className="no-more">已显示全部内容</div>):null} 
                    </GoTop>
                </SlideTabsItem>
            );
        });
        return (
            <div className="inner-scroll">
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    {items}
                </SlideTabs>
            </div>
        )
    }
}

export default Coupon;