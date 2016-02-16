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
                <div className="qr">
                    <img src="/client/asset/images/qr.png"/>
                    <div className="arrow"></div>
                </div>
            );
        }
        return (
            <div className="box">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span className="title">优惠券详情</span>
                </Header>
                <div className="coupon-detail">
                    {qrcode}
                    <dl>
                        <dt>优惠券号</dt>
                        <dd>{coupon.couponNo}</dd>
                    </dl>
                    <dl>
                        <dt>优惠券名</dt>
                        <dd>{coupon.couponName}</dd>
                    </dl>
                    <dl>
                        <dt>使用平台</dt>
                        <dd>{coupon.platform}</dd>
                    </dl>
                    <dl>
                        <dt>发券日期</dt>
                        <dd>{coupon.issueDate}</dd>
                    </dl>
                    <dl>
                        <dt>使用期限</dt>
                        <dd>{coupon.expDate}</dd>
                    </dl>
                    <dl>
                        <dt>使用说明</dt>
                        <dd>{coupon.remark}</dd>
                    </dl>
                </div>
            </div>
        )
    }
}

export default CouponDetail;