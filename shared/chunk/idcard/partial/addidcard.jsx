'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";

class AddIDcard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardName:'',
            cardID:''
        }
    }
    handleSubmit(){
        const {cardName,cardID} = this.state;
        const {frontImgUri,backImgUri} = this.props.addcard;
        const param = {
            name:cardName,
            idcard:cardID,
            fontImg:frontImgUri,
            backImg:backImgUri
        }
        this.props.addIDcard(param);
        //console.log(param)
    }
    handleChangeCardID(event){
        const value =event.target.value;
        this.setState({
            cardID:value
        });
    }
    handleChangeCardName(event){
        const value =event.target.value;
        this.setState({
            cardName:value
        });
    }
    handleChangeBackImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('backImg',files[0]);
        this.props.uploadBackImage({data:formData});
    }
    handleChangeFrontImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('frontImg',files[0]);
        this.props.uploadFrontImage({data:formData});
    }
    render(){
        const {frontImg,backImg}=this.props.addcard;
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
                            <input type="text" placeholder="请输入身份证姓名" onChange={this.handleChangeCardName.bind(this)}/>
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" placeholder="请输入身份证号码" onChange={this.handleChangeCardID.bind(this)}/>
                        </div>
                            
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span>
                                    <img src={frontImg} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" name="front" onChange={this.handleChangeFrontImg.bind(this)}/>
                                </span>
                                <span>
                                    <img src={backImg} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" name="back" onChange={this.handleChangeBackImg.bind(this)}/>
                                </span>
                            </div>
                            <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                            <div className="addBtns">
                                <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="addBtn">保&nbsp;存</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddIDcard;
