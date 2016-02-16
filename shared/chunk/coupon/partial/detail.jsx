'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class CouponDetail extends Component{
    handleBack(){
        this.props.changeScene("index");
    }
    render(){
        const {coupon} = this.props.detail;
        var qrcode = null;
        if(coupon.qrCode){
            qrcode = (
                <div className="coupon-qrcode">
                    <img src={coupon.qrCode} alt=""/>
                </div>
            )
        }
        return (
            <div className="coupon-detail-content">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span>优惠券详情</span>
                    <a href="javascript:;" className="link" onClick={this.props.changeScene.bind(this,"rule",{id:coupon.couponNo})}>用券规则</a>
                </Header>
                <div className="coupon-detail-body">
                    {qrcode}
                    <p>
                        <label>优惠券号</label>
                        <span>{coupon.couponNo}</span>
                    </p>
                    <p>
                        <label>优惠券名</label>
                        <span>{coupon.couponName}</span>
                    </p>
                    <p>
                        <label>使用平台</label>
                        <span>{coupon.platform}</span>
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
                        <span>{coupon.expDate}</span>
                    </p>
                    <p>
                        <label>使用说明</label>
                        <span>{coupon.remark}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default CouponDetail;