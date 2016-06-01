'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";
import ActivityIndicator from "../../common/activityindicator.jsx";

class AddIDcard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardName:'',
            cardID:''
        }
    }
    componentDidUpdate(prevProps){
        const prevAddCarded = prevProps.isAddCarded;
        const {isAddCarded} = this.props;
        if(prevAddCarded===false && isAddCarded===true){
            this.props.changeScene('index',{needUpdated:true});
        }
    }
    handleSubmit(){
        const {cardName,cardID} = this.state;
        const {frontImgUri,backImgUri} = this.props;
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
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('backImg',files[0]);
        this.props.uploadBackImage({data:formData,type:"add"});
    }
    handleChangeFrontImg(event){
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('frontImg',files[0]);
        this.props.uploadFrontImage({data:formData,type:"add"});
    }
    render(){
        const {frontImg,backImg,isUploading}=this.props;
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
                                    <img src={frontImg||'/client/asset/images/pic_id.jpg'} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" onChange={this.handleChangeFrontImg.bind(this)}/>
                                </span>
                                <span>
                                    <img src={backImg||'/client/asset/images/pic_id2.jpg'} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" onChange={this.handleChangeBackImg.bind(this)}/>
                                </span>
                            </div>
                            <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                            <div className="addBtns">
                                <a href="javascript:;" onClick={this.handleSubmit.bind(this)} className="addBtn">保&nbsp;存</a>
                            </div>
                        </div>
                    </div>
                </div>
                <ActivityIndicator active={isUploading}/>
            </div>
        )
    }
}

export default AddIDcard;
