'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../lib/util.es6";
import {Tabs,TabsItem} from "../../component/tabs.jsx";
 
 
import Header from "../common/header.jsx";
 

class Coupon extends React.Component{
    constructor(props){
        super(props);
    }
 
    render(){
        var {enableCoupons,legueCoupons,invalidCoupons} = this.props;
        enableCoupons = enableCoupons.map((enableCoupon,i)=>{
            const key = "coupon-" + i;
            return (
                <CouponRow coupon={enableCoupon} key={key}/>
            )
        });
        legueCoupons = legueCoupons.map((legueCoupon,i)=>{
            const key = "coupon-" + i;
            return (
                <LegueCouponRow coupon={legueCoupon} key={key}/>
            )
        });
        invalidCoupons = invalidCoupons.map((invalidCoupon,i)=>{
            const key = "coupon-" + i;
            if(invalidCoupon.flag === "legue"){
                return (
                <LegueCouponRow coupon={invalidCoupon} invalid={true} key={key}/>
                )
            }
            return (
                <CouponRow coupon={invalidCoupon} invalid={true} key={key}/>
            )
        });
        return (
            <div>
                <Header>
                    <span className="title">优惠券</span>
                </Header>
                <div className="coupon-list">
                    <Tabs effect="slide">
                        <TabsItem title="特品汇优惠券">{enableCoupons}</TabsItem>
                        <TabsItem title="联盟优惠券">{legueCoupons}</TabsItem>
                        <TabsItem title="已失效优惠券">{invalidCoupons}</TabsItem>
                    </Tabs>
                </div>
            </div>
        )
    }
}

class CouponRow extends Component{
    render(){
        const {coupon,invalid} = this.props;
        const classes = classNames("coupon-row",{
            "general-coupon":coupon.flag === "general",
            "tepin-coupon":coupon.flag === "tepin",
            "hnmall-coupon":coupon.flag === "hnmall",
            "oversea-coupon":coupon.flag === "oversea",
            "offline-coupon":coupon.flag === "offline",
            invalid
        })
        return (
            <a href={"/coupondetail/"+coupon.couponNo}>
            <div className={classes}>
            <section className="coupon-brief">
                <div className="coupon-price">{coupon.shortName}</div>
                <div className="coupon-term">{coupon.useRules}</div>
            </section>
            <section className="coupon-detail">
                <div className="coupon-kind">特品汇www.tepin.com</div>
                <div className="coupon-date">{coupon.useDate}&nbsp;-&nbsp;{coupon.validityDate}</div>
                <div className="coupon-explain">{coupon.couponDesc}</div>
            </section>
            </div>
            </a>
        );
    }
}

class LegueCouponRow extends Component{
    render(){
        const {coupon,invalid} = this.props;
        const classes = classNames("legue-coupon-row",{
            invalid
        })
        return (
            <a href={"/coupondetail/"+coupon.couponNo}>
            <div className={classes}>
            <div className="coupon-row">
                <section className="coupon-brief">
                    <div className="coupon-price">{coupon.shortName}</div>
                </section>
                <section className="coupon-detail">
                    <div className="coupon-kind">特品汇www.tepin.com</div>
                    <div className="coupon-explain">{coupon.couponDesc}</div>
                </section>
            </div>
            <div className="coupon-footer">
                <div className="coupon-term">{coupon.useRules}</div>
                <div className="coupon-date">{coupon.useDate}&nbsp;-&nbsp;{coupon.validityDate}</div>
            </div>
            </div>
            </a>
        );
    }
}
 

export default Coupon;