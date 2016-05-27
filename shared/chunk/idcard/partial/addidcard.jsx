'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class AddIDcard extends Component{
    handleBack(){
        this.props.changeScene("index");
    }
    renderQRcode(coupon){
        if(coupon&&coupon.qrCode){
            return (
                <div className="qr">
                    <img src="/client/asset/images/qr.png"/>
                    <div className="arrow"></div>
                </div>
            )  
        }
        return null;
    }
    render(){
        return (
            <div className="idcard-content">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span className="title">上传身份证</span>
                </Header>
                <div className="upload-idcard">
                     
                </div>
            </div>
        )
    }
}

export default AddIDcard;