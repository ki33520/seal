'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";

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
        if(!frontImgUri||!backImgUri||!name||!number){
            return false;
        }
        if(!this.props.verifyName(name)){
            this.props.alert("请输入正确的姓名",2000);
            return false;
        }
        if(!this.props.verifyIdCard(number)){
            this.props.alert("请输入正确的身份证号码",2000);
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
    handleChangeImg(type,event){
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        //console.log(files)
        if(!files.length){
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
                            <input type="text" placeholder="请输入身份证姓名" value={card.name} onChange={this.handleChange.bind(this,'name')}/>
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" placeholder="请输入身份证号码" value={card.number} onChange={this.handleChange.bind(this,'number')}/>
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
                            <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
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
