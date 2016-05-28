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
      
        var fileList = document.getElementById(type);
        var oMyForm = new FormData();
        var files = event.target.files,
            width = fileList.querySelector('img').width,
            img = new Image();
        oMyForm.append(type,files[0]);
        console.log(oMyForm)
        if(window.URL){
            //File API
              img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
              img.width = width;
              img.onload = function(e) {
                window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
              }
              fileList.appendChild(img);
        }else if(window.FileReader){
            //opera不支持createObjectURL/revokeObjectURL方法。我们用FileReader对象来处理
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function(e){
                alert(files[0].name + "," +e.total + " bytes");
                img.src = this.result;
                img.width = 100;
                //fileList.appendChild(img);
            }
        }else{
            //ie
            obj.select();
            obj.blur();
            var nfile = document.selection.createRange().text;
            document.selection.empty();
            img.src = nfile;
            img.width = 100;
            img.onload=function(){
              alert(nfile+","+img.fileSize + " bytes");
            }
        }
        this.props.uploadIDcardImage({data:oMyForm});
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
