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
                reg: /^[A-Za-z0-9_]{6,18}$/,
                msg: "旧密码"
            },
            password: {
                reg: /^[a-z0-9_-]{6,18}$/,
                msg: "新密码"
            },
            repeatPassword: {
                reg: /^[a-z0-9_-]{6,18}$/,
                msg: "重复新密码"
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
                    if(field.repeatPassword != field.password){
                        dispatch(alert("新密码与重复密码不同",1000));
                        return false;
                    }
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
        const {dispatch} = this.props
        if(nextProps.passwordByForm.passwordChanging === false &&
           this.props.passwordByForm.passwordChanging === true){
            if(nextProps.passwordByForm.passwordChanged === true){
                dispatch(alert("保存成功!",2000));
                setTimeout(()=>window.history.back(),2500);
            }else{
                dispatch(alert(nextProps.passwordByForm.errMsg,2000));
            }
        }
    }
    render(){
        const {oldPassword,password,repeatPassword,alertContent,alertActive} = this.props.passwordByForm;
        return (
            <div className="formlist-content">
                <Header>
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