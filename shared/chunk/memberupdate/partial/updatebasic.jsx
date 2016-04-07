'use strict';

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Datepicker from "./datepicker.jsx";
import Selected from "../../../component/selected/selected.jsx";

import Alert from "../../../component/alert.jsx";
import {urlPrefix} from "../../../lib/jumpurl.es6";

class UpdateBasic extends Component{
    constructor(props){
        super(props);
        const {birthday} = props.basicByForm;
        var date = new Date(birthday),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        var max = (new Date(year,month,0)).getDate();  
        
        this.state = {
            year: year,
            month: month< 10 ? '0'+month : month,
            day: day< 10 ? '0'+day : day,
            max: max
        }
    }
    formVerify(field,e){
        e && e.preventDefault();
        const {alert} = this.props;
        const rules = {
            fieldnickName: {
                reg: function(str){
                    var len = 0;  
                    for(var i=0; i<str.length; i++){
                        if(str.charCodeAt(i)>127 || str.charCodeAt(i)==94){
                            len += 2;
                        }else{
                            if(!/[a-z0-9|_|\-|@]/.test(str.charAt(i))){
                                return false;
                            }
                            len ++;
                        }
                    }
                    if(len<2 || len>12){
                        return false;
                    }else{
                        return true;
                    }
                },
                msg: ["请输入昵称","昵称必须为2-12位英文、数字及- _ @组合"]
            },
            fieldgender: {
                reg: function(str){
                    return /^[0-9]{1}$/.test(str);
                },
                msg: ["请选择性别","请选择性别"]
            }
        };
        if(typeof field === "object"){
            for(let i in field){
                let rule = rules[i];
                if(rule){
                    if(field[i].length===0){
                        alert(rule.msg[0],2000);
                        return false;
                    }
                    if(!rule.reg(field[i])){
                        alert(rule.msg[1],2000);
                        return false;
                    }
                }
                if(i=== "callback"){
                    field[i]();
                }
            }
        }
    }
    componentDidMount(){
        const {birthday} = this.props.basicByForm;
        if(birthday){
            const fieldBirthday = this.state.year+"-"+this.state.month+'-'+this.state.day;
            this.props.changeField("birthday",fieldBirthday);
        }
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        this.props.changeField("field"+fieldName,e.target.value);
    }
    handleSelectChange(fieldName,value,e){
        e && e.preventDefault();
        this.props.changeField("field"+fieldName,value);
    }
    handleChangeBasic(e){
        e && e.preventDefault();
        const {changeBasic,basicByForm} = this.props;
        let {nickName,gender,birthday,fieldnickName,fieldgender} = basicByForm;
        gender = gender === "-1" ? null : gender;
        this.formVerify({
            fieldnickName,fieldgender,birthday,
            callback: function(){
                changeBasic(urlPrefix+"/updatebasic",{
                    nickName: fieldnickName,
                    gender: fieldgender,
                    birthday: birthday
                });
            }
        });
        
    }
    componentWillReceiveProps(nextProps){
        const {changeScene} = this.props;
        const self = this;
        if(nextProps.basicByForm.basicChanging === false &&
           this.props.basicByForm.basicChanging === true){
            if(nextProps.basicByForm.basicChanged === true){
                this.props.alert(nextProps.basicByForm.msg,2000);
                setTimeout(()=>{changeScene.call(self,"index")},2500);
            }
        }
    }
    birthdayChange(fieldName,type,value){
        var object = {};
        object[type] = value;
        var obj = Object.assign({},this.state,object);
        object.max = (new Date(obj.year,obj.month, 0)).getDate();
        obj.day = object.max < obj.day ? object.max : obj.day;
        this.setState(object);
        let birthday;
        if(obj.year === "-1" || obj.month === "-1" || obj.day === "-1"){
            birthday = null;
        }else{
            birthday = obj.year+"-"+obj.month+'-'+obj.day;
        }
        this.props.changeField(fieldName,birthday);
    }
    render(){
        const {basicByForm,changeScene} = this.props;
        const {fieldnickName,fieldgender,alertContent,alertActive} = basicByForm;

        var optionGender = [{label:"请选择",value:"-1"}];
        _.map(["保密","男","女"],function(a,b){
            optionGender.push({label:a,value:b.toString()});
        })
        return (
            <div className="basic-content">
                <Header onGoBack={changeScene.bind(this,"index")}>
                    <span className="title">基本信息</span>
                    <span className="btn-right" onClick={this.handleChangeBasic.bind(this)}><a>保存</a></span>
                </Header>
                <div className="form-item">
                    <div className="label-item">
                        <label>昵称</label>
                        <input type="text" placeholder="请填写" maxLength="12" name="nickName" value={fieldnickName} onChange={this.handleFieldChange.bind(this,"nickName")}/>
                    </div>
                    <div className="tips">昵称允许输入2-12位字符，支持中英文、数字及“-”“_”“@”组合。</div>
                </div>
                <div className="form-item">
                    <div className="label-item">
                        <label>性别</label>
                        <Selected placeholder="请选择" className="selected gender" options={optionGender} closeOnSelect={true} 
                            maxHeight="5rem" 
                            value={fieldgender} onChange={this.handleSelectChange.bind(this,"gender")}/>
                    </div>
                </div>
                <div className="form-item">
                    <Datepicker {...this.state} birthdayChange={this.birthdayChange.bind(this)} />
                    <div className="tips">填生日有惊喜哦！</div>
                </div>

                <Alert active={alertActive}>{alertContent}</Alert>
            </div>
        );
    }
}

export default UpdateBasic;