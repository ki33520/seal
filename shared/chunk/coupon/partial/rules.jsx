'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class CouponRules extends Component{
    handleBack(){
        const {couponNo} = this.props.rule;
        this.props.changeScene("detail",{id:couponNo});
    }
    render(){
        return (
            <div className="coupon-rules-content">
            <Header onGoBack={this.handleBack.bind(this)}>
                <h3>用券规则</h3>
            </Header>
            <div className="rule">
                <p>1.友阿发放的友阿平台优惠券仅支持在相应的平台提交订单时抵减商品金额（不可抵减运费），不能进行兑现和其他操作。异业联盟优惠券仅支持在友阿合作的商家门店按照相应规则使用；</p>
                <p>2.在友阿线上平台购物时使用的优惠券，如果订单没有拆分，则取消订单后，系统将自动返还对应的优惠券。如果订单被拆分，取消某一子订单，优惠券将不会返还；异业联盟优惠券使用之后将不予返还</p>
                <p>3.使用了友阿优惠券购物的订单发生退货行为时，不退还优惠券；</p>
                <p>4.同一笔订单参加相应的活动之后，如果仍然满足优惠券时候条件的，可继续使用优惠券；同一笔订单只可同时使用一张优惠券；</p>
                <p>5.优惠券过期作废，不支持延期；</p>
                <p>6.友阿云商发放的所有优惠券严禁出售或转让，如经发现并证实的，该券将予以作废处理；</p>
            </div>
            </div>
        )
    }
}

export default CouponRules;