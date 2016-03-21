'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";

class Coupon extends Component{
    handleCheck(coupon){
        const {onCheck,checkedCoupon} = this.props;
        if(checkedCoupon && checkedCoupon.couponNo === coupon.couponNo){
            onCheck(null)
        }else{
            onCheck(coupon)
        }
        // this.props.changeScene("index")
    }
    renderCouponRow(){
        const {coupons,checkedCoupon} = this.props;
        if(coupons.length > 0){
            return coupons.map((coupon,i)=>{
                const key = "coupon-" + i;
                return (
                    <div className="coupon haitao hover" key={key} 
                    onClick={this.handleCheck.bind(this,coupon)}>
                        <div className="left">
                            <div className="price"><em>&yen;</em>{coupon.couponFee}</div>
                            <div className="term">{coupon.couponName}</div>
                        </div>
                        <div className="right">
                            <div className="kind">海外购www.tepin.hk</div>
                            <div className="date">{coupon.startTime}-{coupon.endTime}</div>
                            <div className="explain">{coupon.couponRule}</div>
                        </div>
                        {checkedCoupon && checkedCoupon.couponNo === coupon.couponNo?(
                            <div className="selected"></div>
                        ):null}
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
            <Header onGoBack={this.props.changeScene.bind(this,"index")}>选择优惠券</Header>
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