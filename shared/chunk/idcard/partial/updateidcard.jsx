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
        const {alert,changeScene} = this.props;
        if(nextProps.isUpdateCarding === false &&
           this.props.isUpdateCarding === true){
            if(nextProps.isUpdateCarded === true){
                alert(nextProps.msg,1000);
                setTimeout(function(){
                    changeScene.call(this,"index");
                },1000)
            }else{
                alert(nextProps.msg,1000);
            }
        }
    }
    handleSubmit(){
        const {idcard} = this.props;
        const {name,fontImg,backImg,backImgUrl,fontImgUrl,id,cardID} = idcard ? idcard : {};
        const param = {
            id:id,
            name:name,
            cardID:cardID,
            fontImg:fontImg,
            backImg:backImg,
            fontImgUrl:fontImgUrl,
            backImgUrl:backImgUrl
        }
        this.props.updateIDcard(param);
    }
    handleFieldChange(fieldName,e){
        e && e.preventDefault();
        this.props.changeField(fieldName,e.target.value);
    }
    handleChangeBackImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('backImg',files[0]);
        this.props.uploadBackImage({data:formData,type:"update"});
    }
    handleChangeFrontImg(event){
        var target = event.target;
        var files = target.files;
        var formData = new FormData();
        formData.append('frontImg',files[0]);
        this.props.uploadFrontImage({data:formData,type:"update"});
    }
    render(){
        const {idcard,alertActive,alertContent,isUploading} = this.props;
        console.log(this.props)
        const {name,fontImgUrl,backImgUrl,cardID} = idcard ? idcard : {};
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
                            <input type="text" value={cardID} placeholder="请输入身份证号码" onChange={this.handleFieldChange.bind(this,"cardID")} />
                        </div>
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span id="id_front">
                                    <img src={fontImgUrl} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" name="front" onChange={this.handleChangeFrontImg.bind(this)}/>
                                </span>
                                <span id="id_back">
                                    <img src={backImgUrl} />
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
                <Alert active={alertActive}>{alertContent}</Alert>
                <ActivityIndicator active={isUploading}/>
            </div>
        )
    }
}

export default UpdateIdcard;