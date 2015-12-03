'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class CouponDetail extends Component{
    renderButton(coupon){
        const costButton = coupon.costUrl === null?null:(
            <span><a href={coupon.costUrl}>立即使用</a></span>
        );
        var bindButton = null;
        if(coupon.isWeixin == true && coupon.weixinBound == false){
            return (
                <span><a href={coupon.bindWeixinUrl}>添加到微信卡包</a></span>
            );
        }else if(coupon.isWeixin == true && coupon.weixinBound == true){
            return(
                <span><a href="javascript:void(null)" className="disabled">已添加到微信卡包</a></span>
            );
        }
        return (
            <div className="coupon-detail-button">{costButton}{bindButton}</div>
        );
    }
    render(){
        const {coupon} = this.props;

        var qrcode = null;
        if(coupon.qrcodeVisible === true){
            qrcode = (
                <div className="coupon-qrcode">
                    <img src={coupon.qrCode} alt=""/>
                </div>
            )
        }

        return (
            <div className="coupon-detail-content">
            <Header title="优惠券详情"><span>
                <a href="#/rules">用券规则</a>
            </span></Header>
            <div className="coupon-detail-body">
            {qrcode}
            {this.renderButton(coupon)}
            <p>
                <label>优惠券号</label>
                <span>{coupon.couponNo}</span>
            </p>
            <p>
                <label>优惠券名</label>
                <span>{coupon.couponDefName}</span>
            </p>
            <p>
                <label>使用平台</label>
                <span>{coupon.customizeEmploy === ""?coupon.employName:coupon.customizeEmploy}</span>
            </p>
            <p>
                <label>发券日期</label>
                <span>{coupon.issueDate}</span>
            </p>
            <p>
                <label>生效日期</label>
                <span>{coupon.useDate}</span>
            </p>
            <p>
                <label>使用期限</label>
                <span>{coupon.validityDate}</span>
            </p>
            <p>
                <label>使用说明</label>
                <span>{coupon.couponRemark}</span>
            </p>
            </div>
            </div>
        )
    }
}

export default CouponDetail;