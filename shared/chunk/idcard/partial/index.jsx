'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    render(){
        //const {idcardLIst} = this.props.index;
        //console.log(idcardLIst)
        return (
            <div className="idcard-content">
                <Header onGoBack={this.props.changeScene.bind(this,"index")}>
                    <span className="title">身份证管理</span>
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
                    
                    <footer>
                        <a href="javascript:;" className="btn">保&nbsp;存</a>
                    </footer>
                    
                </div>
            </div>
        )
    }
}

export default Index;