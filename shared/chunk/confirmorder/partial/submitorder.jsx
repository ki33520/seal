'use strict';

import React,{Component} from "react";
import moment from "moment";
import {getSignatureByParam} from "../../../lib/util.es6";

class SubmitOrder extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let t = moment().format("X")
        const {orderNo,totalFee,checkedReceiver,promoList,
            openId,wxOpenId,
            homeURL,orderDtailURL,orderStatusURL} = this.props.order
        let productList = []
        promoList.forEach((promo)=>{
            promo.goods.forEach((good)=>{
                productList.push({
                    goodsName:good.title,
                    goodsColorAndSize:good.attrs
                })
            })
        })
        let message = {
            orderNo:orderNo,
            totalFee:totalFee,
            subject:"haiwaigouH5",
            wxOpenId:"wxOpenId",
            orderDtailURL:orderDtailURL,
            createTime:moment().format("YYYY-MM-DD HH:mm:ss"),
            endTime:moment().add(2,"h").format("YYYY-MM-DD HH:mm:ss"),
            address:checkedReceiver.provinceName+checkedReceiver.cityName+checkedReceiver.districtName+checkedReceiver.address,
            userName:checkedReceiver.consignee,
            mobile:checkedReceiver.mobileNumber,
            appName:"haiwaigou",
            homeURL:homeURL,
            orderStatusURL:orderStatusURL,
            version:"NEW",
            productList:productList
        }
        message = JSON.stringify({"message":message})
        let param = {
            appId:"hwg",
            channel:"Mobile",
            openId:openId,
            t,
            terminalType:"H5",
            message
        }
        let h = getSignatureByParam(param)
        return (
            <div className="confirmBtns">
                <a href="javascript:void(0);" className="confirm_btn" 
                onClick={this.props.onSubmit}>提交订单</a>
                <form action="http://cashier.e9448.com/cashier/v1/cashier" method="POST" ref="submitForm">
                    <input type="hidden" name="appId" value="hwg" />
                    <input type="hidden" name="channel" value="Mobile" />
                    <input type="hidden" name="openId" value={openId} />
                    <input type="hidden" name="terminalType" value="H5" />
                    <input type="hidden" name="message" value={message} />
                    <input type="hidden" name="t" value={t} />
                    <input type="hidden" name="h" value={h} />
                </form>
            </div>
        )
    }
}

export default SubmitOrder;