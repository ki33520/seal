'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class UpdateIdcard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {idcard} =  this.props.update;
        const {name,cardID,fontImgUrl,backImgUrl} = idcard ? idcard : {};
        return (
            <div className="idcard-form-content">
                <Header onGoBack={this.props.changeScene.bind(this,"index")}>
                    <span className="title">身份证修改</span>
                    <a className="screening">保存</a>
                </Header>
                <div className="idcard-form-inner">
                    <div className="identityUpload">
                        <div>
                            <em>身份证姓名</em>
                            <input type="text" value={name} disabled="disabled" />
                        </div>
                        <div>
                            <em>身份证号码</em>
                            <input type="text" value={cardID} placeholder="请输入身份证号码" />
                        </div>
                        <div className="uploadArea">
                            <em>身份证照片</em>
                            <div className="pic_id">
                                <span id="id_front">
                                    <img src={fontImgUrl} />
                                    <a href="javascript:;">上传正面</a>
                                    <input accept="image/*" type="file" />
                                </span>
                                <span id="id_back">
                                    <img src={backImgUrl} />
                                    <a href="javascript:;">上传反面</a>
                                    <input accept="image/*" type="file" />
                                </span>
                            </div>

                            <p className="info">说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容;说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明。</p>
                            
                            <div className="addBtns">
                                <a href="javascript:;" className="addBtn">保&nbsp;存</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateIdcard;