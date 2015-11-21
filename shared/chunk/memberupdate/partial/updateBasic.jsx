'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";

import {changeBasic,changeField} from "../action.es6";
import {alert} from "../../common/action.es6";
import Alert from "../../component/alert/alert.jsx";

class UpdateBasic extends Component{
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField(fieldName,e.target.value));
    }
    handleChangeBasic(e){
        e && e.preventDefault();
        const {dispatch,passwordByForm} = this.props;
        const {oldBasic,password,repeatBasic} = passwordByForm;
        dispatch(changeBasic({
            password,repeatBasic,oldBasic
        }));
    }
    render(){
        const {memberInfo} = this.props.memberInfoByUser;
        const {nickname,gender,birthdy} = memberInfo;
        var genderList = [];
        ["保密","男","女"].map(function(a,b){
            var option;
            if(gender != "" && Number(gender) === b){
                option = <option defaultValue={b} value={b}>{a}</option>;
            }else{
                option = <option value={b}>{a}</option>;
            };
            genderList.push(option);
        });
        return (
            <div className="basic-content">
                <Header title="账户设置">
                    <span onClick={this.handleChangeBasic.bind(this)}><a>保存</a></span>
                </Header>
                <div className="form-item">
                    <div className="label-item">
                        <label>昵称</label>
                        <input type="text" placeholder="请填写" name="nickname" value={nickname} onChange={this.handleFieldChange.bind(this,"nickname")}/>
                    </div>
                    <div className="tips">4-20个字符，可全部有字母组成，或数字、字母、“_”、“-”任意两种以上组合</div>
                </div>
                <div className="form-item">
                    <div className="label-item">
                        <label>性别</label>
                        <select defaultValue={gender} name="gender" onChange={this.handleFieldChange.bind(this,"gender")}>
                            <option>请选择</option>
                            {genderList}
                        </select>
                    </div>
                </div>
                <div className="form-item">
                    <div className="tips">填生日有惊喜哦！</div>
                </div>
            </div>
        );
    }
}

export default UpdateBasic;