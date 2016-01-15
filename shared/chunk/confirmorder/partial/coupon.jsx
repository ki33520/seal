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
        if(coupons){
            return coupons.map((coupon,i)=>{
                const key = "coupon-" + i;
                return (
                    <div className="coupon haitao hover" key={key}>
                        <div className="left">
                            <div className="price"><em>&yen;</em>{coupon.couponFee}</div>
                            <div className="term">{coupon.couponRule}</div>
                        </div>
                        <div className="right">
                            <div className="kind">{coupon.couponName}</div>
                            <div className="date">{coupon.startTime}-{coupon.endTime}</div>
                            <div className="explain">{coupon.couponDesc}</div>
                        </div>
                        <div className="selected" onClick={this.handleCheck.bind(this,coupon)}></div>
                    </div>
                )
            })
        }
        return (
         <div className="empty">
            <img src="/client/asset/images/empty_selectCoupon.png" />
            <span>您目前没有可用优惠券哟~</span>
        </div>
        )
    }
    render(){
        return (
            <div className="coupon-content">
            <Header>选择优惠券</Header>
            <div className="listMain">
            <div className="list_youa">
            {this.renderCouponRow()}
            </div>
            </div>
            </div>
        )
    }
}

export default Coupon;