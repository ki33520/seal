'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import Header from "../common/header.jsx";
import fetchCoupon from "./action.es6"; 
import {SlideTabs,SlideTabsItem} from "../../component/slidetabs.jsx";

class Coupon extends React.Component{
    
    handleClick(i){

    }
    
    renderYouaCoupons(coupons){
        if(coupons.length){
            return coupons.map((item,i)=>{
                return (
                    <YouaCoupon coupon={item} invalid={false} key={'y-'+i} />
                )
            });
        }else{
            return (<NoCoupon message="您目前没有友阿优惠券哟！"/>);
        }
    }
    renderLegueCoupons(coupons){
        if(coupons.length){
            return coupons.map((item,i)=>{
                return (
                    <LegueCoupon coupon={item} invalid={false} key={'l-'+i} />
                )
            });
        }else{
            return (<NoCoupon message="您目前没有联盟优惠券哟！"/>);
        }
    }  
    renderInvalidCoupons(coupons){
        if(coupons.length){
            return coupons.map((item,i)=>{
                if(item.flag==='legue'){
                    return (<LegueCoupon coupon={item} invalid={true} key={'il-'+i} />)
                }else{
                    return (<YouaCoupon coupon={item} invalid={true} key={'iy-'+i} />)
                }
            });
        }else{
            return (<NoCoupon message="您目前没有失效优惠券哟！"/>);
        }
    }

    render(){
        const {youaCoupons,legueCoupons,invalidCoupons,isFetching} = this.props;
        
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <SlideTabs axis="x" navbarSlidable={false} onSelect={this.handleClick.bind(this)}>
                    <SlideTabsItem navigator={()=>'友阿优惠券'}>
                        <div>{this.renderYouaCoupons(youaCoupons)}</div>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'联盟优惠券'}>
                        <div>{this.renderInvalidCoupons(legueCoupons)}</div>
                    </SlideTabsItem>
                    <SlideTabsItem navigator={()=>'已失效优惠券'}>
                        <div>{this.renderInvalidCoupons(invalidCoupons)}</div>
                    </SlideTabsItem>
                </SlideTabs>
            </div>
        )
    }
}

class YouaCoupon extends Component{
    render(){
        const {coupon,invalid} = this.props;
        const beUsed = classNames({
            beUsed:invalid
        });

        let flag = coupon.flag;
        let classes = classNames("coupon",{
            "youa-invalid":invalid,
            "haitao":!invalid
        });

        return (
            <div className={classes}>
                <a href={"/coupondetail/"+coupon.couponNo}>
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
}

class LegueCoupon extends Component{
    render(){
        const {coupon,invalid} = this.props;

        const classes = classNames("coupon",{
            "union-invalid":invalid,
            "union":!invalid
        });

        const expired = classNames({
            expired:invalid
        });

        return (
            <div className={classes}>
                <a href={"/coupondetail/"+coupon.couponNo}>
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
}

class NoCoupon extends Component{
    render(){
        const {message}=this.props;
        return (
            <div className="empty">
                <img src="/client/asset/images/empty_coupon.png" />
                <span>{message}</span>
            </div>
        )
    }
}

export default Coupon;