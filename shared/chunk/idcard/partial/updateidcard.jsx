'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";
import {verifyName,verifyIdCard} from "../../../lib/idcard.es6";

class UpdateIdcard extends Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isUpdateCarding === false &&
           this.props.isUpdateCarding === true){
            if(nextProps.isUpdateCarded === true){
                this.props.alert('保存成功',2000);
                setTimeout(()=>{
                    this.props.changeScene("index");
                },2000)
            }else{
                this.props.alert('保存失败',2000);
            }
        }
    }
    handleSubmit(){
        const {name,frontImgUrl,frontImgUri,backImg,backImgUrl,backImgUri,id,number} = this.props.card;
        if(this.props.isUpdateCarding){
            return false;
        }
        if(!verifyName(name)){
            if(name){
                this.props.alert("请输入正确的姓名",2000);
            }else{
                this.props.alert("请输入姓名",2000);
            }
            return false;
        }
        if(!verifyIdCard(number)){
            if(number){
                this.props.alert("请输入正确的身份证号码",2000);
            }else{
                this.props.alert("请输入身份证号码",2000);
            }
            return false;
        }
        if(!frontImgUri){
            this.props.alert("请上传身份证正面照片",2000);
            return false;
        }
        if(!backImgUri){
            this.props.alert("请上传身份证反面照片",2000);
            return false;
        }
        let list = this.props.cardID.idcardLIst;
        let pass = true;
        list.map((v,k)=>{
            if(v.name === name && v.id !== id){
                pass = false;
            }
        });
        if(!pass){
            this.props.alert("不能添加重复的用户",2000);
            return false;
        }
        const param = {
            id:id,
            name:name,
            number:number,
            frontImgUrl:frontImgUrl,
            backImgUrl:backImgUrl,
            frontImgUri:frontImgUri,
            backImgUri:backImgUri
        }
        this.props.updateIDcard(param);
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        this.props.changeField(fieldName,e.target.value,'updatecard');
    }
    handleReset(fieldName,e){
        e && e.preventDefault();
        clearTimeout(this.blurEvent);
        this.props.changeField(fieldName,e.target.value,'updatecard');
    }
    handleBlur(fieldName,event){
        const value =event.target.value;
        const {name,id} = this.props.card;
        let list = this.props.cardID.idcardLIst;
        const self = this;
        if(fieldName === "name"){
            if(!verifyName(value)){
                this.blurEvent = setTimeout(function(){
                    if(self.props.card.name){
                        self.props.alert("请输入正确的姓名",1500);
                    }else{
                        self.props.alert("请输入姓名",1500);
                    }
                },100);
            }else{
                let pass = true;
                list.map((v,k)=>{
                    if(v.name === name && v.id !== id){
                    console.log(v.id,id)
                        pass = false;
                    }
                });
                if(!pass){
                    this.props.alert("不能添加重复的用户",1500);
                    return false;
                }
            }
        }
        if(fieldName === "number"){
            if(!verifyIdCard(value)){
                this.blurEvent = setTimeout(function(){
                    if(self.props.card.number){
                        self.props.alert("请输入正确的身份证号码",1500);
                    }else{
                        self.props.alert("请输入身份证号码",1500);
                    }
                },100);
            }
        }
    }
    handleChangeImg(type,event){
        var formData = new FormData();
        var target = event.target;
        var files = target.files;
        var regExp = /^image\/(jpg|jpeg|png)$/;
        var info = type === 'backImg' ? '反':'正';
        if(!files.length){
            return false;
        }
        if(!regExp.test(files[0].type)){
            this.props.alert('请上传身份证'+info+'面照片!',2000);
            return false;
        }
        formData.append(type,files[0]);
        this.props.uploadCardImage({data:formData},'updatecard');
    }
    render(){
        const {card,alertActive,alertContent,isUploading} = this.props;
        const {name,frontImgUrl,backImgUrl,number} = card;
        const numberClasses = classNames("reset-btn",{
            active:!!number
        })
        return (
            <div className="idcard-form-content">
                <Header onGoBack={this.props.changeScene.bind(this,"index")}>
                    <span className="title">身份证修改</span>
                    <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="screening">保存</a>
                </Header>
                <div className="idcard-form-inner">
                    <div className="identityUpload">
                        <div>
                            <em>身份证姓名</em>
                            <input type="text" maxLength="10" disabled value={name} placeholder="请输入真实的姓名" onChange={this.handleFieldChange.bind(this,'name')} onBlur={this.handleBlur.bind(this,'name')} />
                        </div>
                        <div className="reset-box">
                            <em>身份证号码</em>
                            <input type="text" value={number} placeholder="请输入真实的身份证信息" onChange={this.handleFieldChange.bind(this,"number")} onBlur={this.handleBlur.bind(this,'number')}/>
                            <div className={numberClasses} onClick={this.handleReset.bind(this,"number")}><i className="iconfont icon-close-fill"></i></div>
                        </div>
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span id="id_front">
                                    <img src={frontImgUrl} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" name="front" onChange={this.handleChangeImg.bind(this,'frontImg')}/>
                                </span>
                                <span id="id_back">
                                    <img src={backImgUrl} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" name="back" onChange={this.handleChangeImg.bind(this,'backImg')}/>
                                </span>
                            </div>
                            <p className="info">系统检测到你已填写身份证信息，如果有误，请修改！</p>
                            
                            <div className="addBtns">
                                <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="addBtn">保&nbsp;存</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Alert active={alertActive}>{alertContent}</Alert>
                <ActivityIndicator active={isUploading}/>
            </div>
        )
    }
}

export default UpdateIdcard;