'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class UpdateIdcard extends Component{
    constructor(props){
        super(props);
        const {idcard} = props.update;
        const {cardID} = idcard ? idcard : {};
        this.state = {
            cardID: cardID
        }
    }
    handleSubmit(){
        const {idcard} = this.props.update;
        const {name,fontImg,backImg,id} = idcard ? idcard : {};
        const {cardID} = this.state;
        const param = {
            id:id,
            name:name,
            idcard:cardID,
            fontImg:fontImg,
            backImg:backImg
        }
        this.props.updateIDcard(param);
    }
    handleChangeCardID(event){
        const value =event.target.value;
        this.setState({
            cardID:value
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
        const {idcard} = this.props.update;
        const {name,fontImgUrl,backImgUrl} = idcard ? idcard : {};
        const {cardID} = this.state;
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
                            <input type="text" value={cardID} placeholder="请输入身份证号码" onChange={this.handleChangeCardID.bind(this)}/>
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
            </div>
        )
    }
}

export default UpdateIdcard;