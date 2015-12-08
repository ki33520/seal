'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";

class Coupon extends Component{
    handleCheck(coupon){
        const {onCheck} = this.props;
        onCheck(coupon)
        window.history.back();
    }
    renderCouponRow(){
        const {coupons} = this.props;
        return coupons.map((coupon,i)=>{
            const key = "coupon-" + i;
            return (
                <div className="coupon-row tepin-coupon" onClick={this.handleCheck.bind(this,coupon)}>
                <section className="coupon-brief">
                    <div className="coupon-price">{coupon.shortName}</div>
                    <div className="coupon-term">{coupon.assertion}</div>
                </section>
                <section className="coupon-detail">
                    <div className="coupon-kind">特品汇www.tepin.com</div>
                    <div className="coupon-date">{coupon.useDate}&nbsp;-&nbsp;{coupon.validityDate}</div>
                    <div className="coupon-explain">{coupon.couponDesc}</div>
                </section>
                </div>
            )
        })
    }
    render(){
        return (
            <div className="coupon-content">
            <Header title="优惠券"/>
            {this.renderCouponRow()}
            </div>
        )
    }
}

export default Coupon;