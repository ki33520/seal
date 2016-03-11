'use strict';

import React,{Component} from "react";
import _ from "lodash";
import Hashes from "jshashes";
import classNames from "classnames";
import Header from "../../common/header.jsx";

import {changePassword,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class UpdatePassword extends Component{
    handleFieldChange(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        const fieldName = e.target.name;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleFieldBlur(e){
        e && e.preventDefault();
        const {dispatch,passwordByForm} = this.props;
        const fieldName = e.target.name;
        let obj = {};
        obj[fieldName] = passwordByForm[fieldName]
        this.formVerify(obj,e);
    }
    formVerify(field,e){
        e && e.preventDefault();
        const {dispatch,passwordByForm} = this.props;
        const rules = {
            oldPassword: {
                reg: /^[A-Za-z0-9_]{1,}$/,
                msg: ["请输入旧密码","旧密码错误，请重新输入！"]
            },
            password: {
                reg: /^[a-z0-9_-]{6,16}$/,
                msg: ["请输入新密码，6-16个字符","新密码长度不符合要求，请重新输入正确的6-16个字符的密码！","新密码格式不符合要求，请重新输入正确的6-16个字符的密码！"]
            },
            repeatPassword: {
                reg: /^[a-z0-9_-]{6,16}$/,
                msg: ["请重复新密码","重复新密码错误，请重新输入！"]
            }
        };
        if(typeof field === 'object'){
            for(let i in field){
                let rule = rules[i];
                if(rule){
                    if(field[i].length===0){
                        dispatch(alert(rule.msg[0],2000));
                        return false;
                    }
                    if(!rule.reg.test(field[i])){
                        dispatch(alert(rule.msg[1],2000));
                        return false;
                    };
                    if(i==="repeatPassword" && field.repeatPassword != field.password){
                        dispatch(alert(rule.msg[1],2000));
                        return false;
                    }
                }
                if(i=== "callback"){
                    field[i]();
                }
            }
        }
    }
    handleChangePassword(e){
        e && e.preventDefault();
        const {dispatch,passwordByForm} = this.props;
        const {oldPassword,password,repeatPassword} = passwordByForm;
        const SHA1 = new Hashes.SHA1;
        this.formVerify({
            oldPassword,password,repeatPassword,
            callback: function(){
                dispatch(changePassword("/updatepassword",{
                    oldPassword: SHA1.hex(oldPassword),
                    password: SHA1.hex(password),
                    repeatPassword: SHA1.hex(repeatPassword)
                }));
            }
        },e);
        
    }
    componentWillReceiveProps(nextProps){
        const {dispatch,changeScene} = this.props
        const self = this;
        if(nextProps.passwordByForm.passwordChanging === false &&
           this.props.passwordByForm.passwordChanging === true){
            if(nextProps.passwordByForm.passwordChanged === true){
                dispatch(alert(nextProps.passwordByForm.msg,2000));
                setTimeout(()=>{changeScene.call(self,"index")},2500);
            }else{
                dispatch(alert(nextProps.passwordByForm.msg,2000));
            }
        }
    }
    render(){
        const {changeScene} = this.props;
        const {oldPassword,password,repeatPassword,alertContent,alertActive} = this.props.passwordByForm;
        return (
            <div className="formlist-content">
                <Header onGoBack={changeScene.bind(this,"index")}>
                    <span className="title">修改登录密码</span>
                </Header>
                <ul className="setup-form">
                    <li>
                        <input type="password" placeholder="请输入旧密码" name="oldPassword" value={oldPassword} 
                        onChange={this.handleFieldChange.bind(this)}/>
                    </li>
                    <li>
                        <input type="password" placeholder="请输入新密码" name="password" value={password} 
                        onChange={this.handleFieldChange.bind(this)}/>
                    </li>
                    <li>
                        <input type="password" placeholder="重复新密码" name="repeatPassword" value={repeatPassword} 
                        onChange={this.handleFieldChange.bind(this)}/>
                    </li>
                </ul>
                <div className="setup-button">
                    <a href="javascript:void(null)" onClick={this.handleChangePassword.bind(this)}>确认修改</a>
                </div>
                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        )
    }
}

export default UpdatePassword;