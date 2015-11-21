'use strict';

import React,{Component} from "react";
import Header from "../../common/header/header.jsx";
import Icon from "../../component/core/icon.jsx";

import {resetMobile,changeField,resetMobileVerifyCode} from "../action.es6";

class ResetMobile extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleResetMobile(e){
        e && e.preventDefault();
        const {dispatch,mobileByForm} = this.props;
        const {mobileNumber,verifyCode} = mobileByForm;
        dispatch(resetMobile({
            mobileNumber,verifyCode
        }));
    }
    handleSendVerifyCode(e){
        e && e.preventDefault();
        const {dispatch,mobileByForm} = this.props;
        const {mobileNumber} = mobileByForm;
        dispatch(resetMobileVerifyCode({
            mobileNumber
        }))
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props
        if(nextProps.mobileByForm.mobileReseting === false &&
           this.props.mobileByForm.mobileReseting === true){
            if(nextProps.mobileByForm.mobileReseted === true){
                dispatch(alert("保存成功!",2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.mobileByForm.errMsg,2000));
            }
        }
        if(nextProps.mobileByForm.verifyCodeSending === false &&
           this.props.mobileByForm.verifyCodeSending === true){
            if(nextProps.mobileByForm.verifyCodeSended === true){
                dispatch(alert("验证码发送成功!",2000));
            }else{
                dispatch(alert(nextProps.mobileByForm.errMsg,2000));
            }
        }
    }
    render(){
        const {mobileNumber,verifyCode,alertActive,alertContent} = this.props.mobileByForm;
        return (
            <div className="resetmobile-content">
            <Header title="重绑手机号"/>
            <ul className="setup-form">
                <li>
                    <Icon icon="lock" />
                    <input type="text" placeholder="绑定手机号" name="mobileNumber" value={mobileNumber} 
                    onChange={this.handleFieldChange.bind(this,"mobileNumber")}/>
                </li>
            </ul>
            <ul className="setup-form setup-form-verify">
                <li>
                    <input type="text" placeholder="验证码" name="verifyCode" value={verifyCode} 
                    onChange={this.handleFieldChange.bind(this,"verifyCode")}/>
                    <a href="javascript:void(null)" onClick={this.handleSendVerifyCode.bind(this)}>获取验证码</a>
                </li>
            </ul>
            <div className="setup-button">
                <a href="javascript:void(null)" onClick={this.handleResetMobile.bind(this)}>确认绑定</a>
            </div>
            <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default ResetMobile;