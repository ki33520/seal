'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import Alert from "../../../component/alert.jsx";
import ActivityIndicator from "../../common/activityindicator.jsx";

class UpdateIdcard extends Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.isUpdateCarding === false &&
           this.props.isUpdateCarding === true){
            if(nextProps.isUpdateCarded === true){
                this.props.alert('更新成功',1000);
                setTimeout(()=>{
                    this.props.changeScene("index");
                },1000)
            }else{
                this.props.alert('更新失败',1000);
            }
        }
    }
    handleSubmit(){
        const {name,frontImgUrl,frontImgUri,backImg,backImgUrl,backImgUri,id,number} = this.props.card;
        const param = {
            id:id,
            name:name,
            number:number,
            fontImgUrl:frontImgUrl,
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
    handleChangeImg(type,event){
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
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
                            <input type="text" value={name} disabled="disabled" />
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" value={number} placeholder="请输入身份证号码" onChange={this.handleFieldChange.bind(this,"number")} />
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

export default UpdateIdcard;