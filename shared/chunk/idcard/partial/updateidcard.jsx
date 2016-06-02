'use strict';

import React,{Component} from "react";
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
                this.props.alert('您已填写身份证信息，如有误，请修改！',1000);
                setTimeout(()=>{
                    this.props.changeScene("index");
                },1500)
            }else{
                this.props.alert('更新失败',1000);
            }
        }
    }
    handleSubmit(){
        const {name,frontImgUrl,frontImgUri,backImg,backImgUrl,backImgUri,id,number} = this.props.card;
        if(this.props.isUpdateCarding){
            return false;
        }
        if(!verifyName(name)){
            this.props.alert("请输入正确的姓名",2000);
            return false;
        }
        if(!verifyIdCard(number)){
            this.props.alert("请输入正确的身份证号码",2000);
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
    handleBlur(fieldName,event){
        const value =event.target.value;
        let list = this.props.cardID.idcardLIst;
        if(fieldName === "name"){
            if(!verifyName(value)){
            }else{
                list.forEach((v,k)=>{
                    if(v.name === value){
                        this.props.alert("不能添加重复的用户",2000);
                    }
                });
            }
        }
        if(fieldName === "number"){
            if(!verifyIdCard(value)){
                this.props.alert("请输入正确的身份证号码",2000);
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
            this.props.alert('请上传身份证'+info+'面照片!',3000);
            return false;
        }
        formData.append(type,files[0]);
        this.props.uploadCardImage({data:formData},'updatecard');
    }
    render(){
        const {card,alertActive,alertContent,isUploading} = this.props;
        const {name,frontImgUrl,backImgUrl,number} = card;
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
                            <input type="text" maxLength="10" value={name} placeholder="请输入真实的姓名" onChange={this.handleFieldChange.bind(this,'name')} onBlur={this.handleBlur.bind(this,'name')} />
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" value={number} placeholder="请输入真实的身份证信息" onChange={this.handleFieldChange.bind(this,"number")} onBlur={this.handleBlur.bind(this,'number')}/>
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
                            <p className="info">身份证信息用于商品入境申报，海外直邮，请填写收货人的真实身份证信息。请确保您上传的身份证图片足够清晰并且与收货人信息完全一致。</p>
                            
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