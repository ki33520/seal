'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";

import {bindMembercard,sendVerifyCode,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class UpdateMemberCard extends Component{
    handleFieldChange(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const fieldName = e.target.name;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleFieldBlur(e){
        e && e.preventDefault();
        const {dispatch,membercardByForm} = this.props;
        const fieldName = e.target.name;
        let obj = {};
        obj[fieldName] = membercardByForm[fieldName]
        this.formVerify(obj,e);
    }
    formVerify(field,e){
        e && e.preventDefault();
        const {dispatch,membercardByForm} = this.props;
        const rules = {
            cardNo: {
                reg: /^[0-9]{10}$/,
                msg: "会员卡卡号"
            },
            mobileNumber: {
                reg: /^(1(([35][0-9])|(47)|[8][0123456789]))\d{8}$/,
                msg: "手机号码"
            },
            verifyCode: {
                reg: /^[0-9]{6}$/,
                msg: "验证码"
            }
        };
        if(typeof field === 'object'){
            for(let i in field){
                let rule = rules[i];
                if(rule){
                    if(!rule.reg.test(field[i]) || !field[i]){
                        dispatch(alert("请正确填写"+rule.msg,1000));
                        return false;
                    };
                }else{
                    field[i]();
                }
            }
        }
    }
    handleBindMembercard(e){
        e && e.preventDefault();
        const {dispatch,membercardByForm} = this.props;
        const {cardNo,mobileNumber,verifyCode} = membercardByForm;

        this.formVerify({
            cardNo,mobileNumber,verifyCode,
            callback: function(){
                dispatch(bindMembercard("/updatemembercard",{
                    cardNo,mobileNumber,verifyCode
                }));
            }
        },e);
        
    }
    handleSendVerifyCode(e){
        e && e.preventDefault();
        const {dispatch,membercardByForm} = this.props;
        const {cardNo,mobileNumber} = membercardByForm;

        this.formVerify({
            cardNo,
            mobileNumber,
            callback: function(){
                dispatch(sendVerifyCode("/updatemembercardverifycode",{
                    cardNo,mobileNumber
                }));
            }
        },e);
    }
    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props
        if(nextProps.membercardByForm.membercardChanging === false &&
           this.props.membercardByForm.membercardChanging === true){
            if(nextProps.membercardByForm.membercardChanged === true){
                dispatch(alert("保存成功!",2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.membercardByForm.errMsg,2000));
            }
        }
        
        if(nextProps.membercardByForm.verifyCodeSending === false &&
           this.props.membercardByForm.verifyCodeSending === true){
            if(nextProps.membercardByForm.verifyCodeSended === true){
                dispatch(alert("验证码发送成功!",2000));
            }else{
                dispatch(alert(nextProps.membercardByForm.errMsg,2000));
            }
        }
    }
    render(){
        const {cardNo,mobileNumber,verifyCode,alertActive,alertContent} = this.props.membercardByForm;
        return (
            <div className="formlist-content membercard-form">
                <Header>
                    <span className="title">绑定会员卡</span>
                </Header>
                <ul className="setup-form">
                    <li>
                        <input type="text" placeholder="请输入友阿会员卡卡号" name="cardNo" value={cardNo} 
                        onChange={this.handleFieldChange.bind(this)}/>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入会员卡绑定手机" name="mobileNumber" value={mobileNumber} 
                        onChange={this.handleFieldChange.bind(this,)}/>
                    </li>
                    <li>
                        <div className="inner">
                            <input type="text" placeholder="请输入验证码" name="verifyCode" value={verifyCode} 
                            onChange={this.handleFieldChange.bind(this)}/>
                            <a href="javascript:void(null)" onClick={this.handleSendVerifyCode.bind(this)}>获取验证码</a>
                        </div>
                    </li>
                </ul>
                <div className="setup-button">
                    <a href="javascript:void(null)" onClick={this.handleBindMembercard.bind(this)}>确认绑定</a>
                </div>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default UpdateMemberCard;