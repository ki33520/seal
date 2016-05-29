'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";

class AddIDcard extends Component{
    constructor(props){
        super(props);
    }
    handleSubmit(){

    }
    handleChange(type,event){
        console.log(event.target)
    }
    handleChangeImg(type,event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('file',files[0]);
        //console.log(formData)
        if(window.URL){
            var src = window.URL.createObjectURL(files[0]);
            target.parentNode.children[0].src=src;
        }
        this.props.uploadIDcardImage({data:formData});
    }
    render(){
        return (
            <div className="idcard-content">
                <Header onGoBack={this.props.changeScene.bind(this,'index')}>
                    <span className="title">身份证上传</span>
                    <span className="btn-right"><a>保存</a></span>
                </Header>
                <div className="identityUpload">
                    <div>
                        <em>身份证姓名</em>
                        <input type="text" placeholder="请输入身份证姓名" onChange={this.handleChange.bind(this,'name')}/>
                    </div>
                    <div>
                        <em>身份证号码</em>
                        <input type="text" placeholder="请输入身份证号码" onChange={this.handleChange.bind(this,'number')}/>
                    </div>
                        
                    <div className="uploadArea">
                        <em>身份证照片</em>
                        <div className="pic_id">
                            <span id="id_front">
                                <img src="/client/asset/images/pic_id.jpg" />
                                <a href="javascript:;">上传正面</a>
                                <input accept="image/*" type="file" name="front" onChange={this.handleChangeImg.bind(this,'id_front')}/>
                            </span>
                            <span id="id_back">
                                <img src="/client/asset/images/pic_id2.jpg" />
                                <a href="javascript:;">上传反面</a>
                                <input accept="image/*" type="file" name="back" onChange={this.handleChangeImg.bind(this,'id_back')}/>
                            </span>
                        </div>
                        <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                        <div className="footer">
                            <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="btn">保&nbsp;存</a>
                        </div>
                    </div>
                  </div>
            </div>
        )
    }
}

export default AddIDcard;
