'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";

import {changePassword,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../../component/alert.jsx";

class UpdatePassword extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleChangePassword(e){
        e && e.preventDefault();
        const {dispatch,passwordByForm} = this.props;
        const {oldPassword,password,repeatPassword} = passwordByForm;
        dispatch("/updatepassword",changePassword({
            password,repeatPassword,oldPassword
        }));
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
                <Header title="修改登录密码" />
                <ul className="setup-form">
                    <li>
                        <span></span>
                        <input type="password" placeholder="请输入旧密码" name="oldPassword" value={oldPassword} 
                        onChange={this.handleFieldChange.bind(this,"oldPassword")}/>
                    </li>
                    <li>
                        <input type="password" placeholder="请输入新密码" name="password" value={password} 
                        onChange={this.handleFieldChange.bind(this,"password")}/>
                    </li>
                    <li>
                        <input type="password" placeholder="重复新密码" name="repeatPassword" value={repeatPassword} 
                        onChange={this.handleFieldChange.bind(this,"repeatPassword")}/>
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