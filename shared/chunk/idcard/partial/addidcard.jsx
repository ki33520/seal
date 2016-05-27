'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class AddIDcard extends Component{
    handleBack(){
        this.props.changeScene("index");
    }
    render(){
        return (
            <div className="idcard-content">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span className="title">身份证上传</span>
                    <span className="btn-right"><a>保存</a></span>
                </Header>
                <div className="identityUpload">
                    <div>
                        <em>身份证姓名</em>
                        <input type="text" placeholder="请输入身份证姓名" />
                    </div>
                    <div>
                        <em>身份证号码</em>
                        <input type="text" placeholder="请输入身份证号码" />
                    </div>
                    <div className="uploadArea">
                        <em>身份证照片</em>
                        <div className="pic_id">
                            <span id="id_front">
                                <img src="/client/asset/images/pic_id.jpg" />
                                <a href="javascript:;">上传正面</a>
                                <input accept="image/*" type="file" />
                            </span>
                            <span id="id_back">
                                <img src="/client/asset/images/pic_id2.jpg" />
                                <a href="javascript:;">上传反面</a>
                                <input accept="image/*" type="file" />
                            </span>
                        </div>
                    </div>
                    
                    <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                    
                    <div className="footer">
                        <a href="javascript:;" className="btn">保&nbsp;存</a>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AddIDcard;