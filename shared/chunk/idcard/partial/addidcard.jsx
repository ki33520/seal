'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";
import {verifyName,verifyIdCard} from "../../../lib/idcard.es6";

class AddIDcard extends Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isAddCarding === false &&
           this.props.isAddCarding === true){
            if(nextProps.isAddCarded === true){
                this.props.alert('保存成功',2000);
                setTimeout(()=>{
                    this.props.changeScene("index");
                },2000);
            }else{
                this.props.alert(nextProps.errMsg ,2000);
            }
        }
    }
    handleSubmit(){
        const {frontImgUri,backImgUri,name,number} = this.props.card;
        if(this.props.isAddCarding){
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
            if(v.name === name){
                pass = false;
            }
        });
        if(!pass){
            this.props.alert("身份证姓名已存在",2000);
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
    handleReset(fieldName,e){
        e && e.preventDefault();
        clearTimeout(this.blurEvent);
        this.props.changeField(fieldName,"",'add');
    }
    handleBlur(fieldName,event){
        const value =event.target.value;
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
                list.forEach((v,k)=>{
                    if(v.name === value){
                        this.props.alert("身份证姓名已存在",1500);
                    }
                });
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
        var formData = new FormData();
        formData.append(type,files[0]);
        this.props.uploadCardImage({data:formData},'add');
    }
    render(){
        const {card,isUploading,alertActive,alertContent}=this.props;
        const {number,name} = card;
        const nameClasses = classNames("reset-btn",{
            active:!!name
        })
        const numberClasses = classNames("reset-btn",{
            active:!!number
        })
        return (
            <div className="idcard-form-content">
                <Header onGoBack={this.props.changeScene.bind(this,'index')}>
                    <span className="title">身份证上传</span>
                    <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="screening">保存</a>
                </Header>
                <div className="idcard-form-inner">
                    <div className="identityUpload">
                        <div className="reset-box">
                            <em>身份证姓名</em>
                            <input type="text" maxLength="10" placeholder="请输入真实的姓名" value={card.name} onChange={this.handleChange.bind(this,'name')} onBlur={this.handleBlur.bind(this,'name')} />
                            <div className={nameClasses} onClick={this.handleReset.bind(this,"name")}><i className="iconfont icon-close-fill"></i></div>
                        </div>
                        <div className="reset-box">
                            <em>身份证号码</em>
                            <input type="text" placeholder="请输入真实的身份证信息" value={card.number} onChange={this.handleChange.bind(this,'number')}  onBlur={this.handleBlur.bind(this,'number')} />
                            <div className={numberClasses} onClick={this.handleReset.bind(this,"number")}><i className="iconfont icon-close-fill"></i></div>
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
