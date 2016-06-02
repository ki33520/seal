'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";
import {verifyName,verifyIdCard} from "../../../lib/idcard.es6";

class AddIDcard extends Component{
    constructor(props){
        super(props);
    }
    componentDidUpdate(prevProps){
        if(!prevProps.isAddCarded && this.props.isAddCarded){
            this.props.changeScene('index');
        }
    }
    handleSubmit(){
        const {frontImgUri,backImgUri,name,number} = this.props.card;
        if(this.props.isAddCarding){
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
            if(v.name === name){
                pass = false;
            }
        });
        if(!pass){
            this.props.alert("不能添加重复的用户",2000);
            return false;
        }
        const param = {
            name:name,
            number:number,
            frontImgUri:frontImgUri,
            backImgUri:backImgUri
        }
        this.props.addIDcard(param);
    }
    handleChange(fieldName,event){
        const value =event.target.value;
        this.props.changeField(fieldName,value,'add')
    }
    handleBlur(fieldName,event){
        const value =event.target.value;
        let list = this.props.cardID.idcardLIst;
        if(fieldName === "name"){
            if(!verifyName(value)){
            }else{
                list.map((v,k)=>{
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
        var target = event.target;
        var files = target.files;
        var regExp = /^image\/(jpg|jpeg|png)$/;
        if(!files.length){
            return false;
        }
        if(!regExp.test(files[0].type)){
            this.props.alert('上传的图片格式不正确!',3000);
            return false;
        }
        var formData = new FormData();
        formData.append(type,files[0]);
        this.props.uploadCardImage({data:formData},'add');
    }
    render(){
        const {card,isUploading,alertActive,alertContent}=this.props;
        return (
            <div className="idcard-form-content">
                <Header onGoBack={this.props.changeScene.bind(this,'index')}>
                    <span className="title">身份证上传</span>
                    <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="screening">保存</a>
                </Header>
                <div className="idcard-form-inner">
                    <div className="identityUpload">
                        <div>
                            <em>身份证姓名</em>
                            <input type="text" placeholder="请输入真实的姓名" value={card.name} onChange={this.handleChange.bind(this,'name')} onBlur={this.handleBlur.bind(this,'name')} />
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" placeholder="请输入真实的身份证信息" value={card.number} onChange={this.handleChange.bind(this,'number')}  onBlur={this.handleBlur.bind(this,'number')} />
                        </div>
                            
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span>
                                    <img src={card.frontImgUrl||'/client/asset/images/pic_id.jpg'} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" onChange={this.handleChangeImg.bind(this,'frontImg')}/>
                                </span>
                                <span>
                                    <img src={card.backImgUrl||'/client/asset/images/pic_id2.jpg'} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" onChange={this.handleChangeImg.bind(this,'backImg')}/>
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

export default AddIDcard;
