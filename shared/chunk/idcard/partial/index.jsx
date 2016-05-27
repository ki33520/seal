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
                <div className="blub">
                    <p>根据海关政策规定，海外直邮的包裹需提供身份证照片进行入境申报，友阿海外购用户请如实提供身份证信息并确保所提供身份证与收货人完全一致。</p>
                </div>
                <div className="list">
                    <div className="listTitle">
                        <span className="name">郭靖</span>
                        <span className="identity">430951196212041234</span>
                        <span className="attestation"><em></em>已认证</span>
                    </div>
                    <div className="pic_id">
                        <span><img src="/client/asset/images/pic_id.jpg" /></span>
                        <span><img src="/client/asset/images/pic_id2.jpg" /></span>
                    </div>
                    <div className="feedbackInfo">
                        <p>身份信息审核内容反馈：反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息反馈信息......</p>
                    </div>
                    <div className="toolsArea">
                        <a href="javascript:;" className="pen"><em></em>编辑</a>
                        <a href="javascript:;" className="del"><em></em>删除</a>
                    </div>
                </div>
                <div className="list">
                    <div className="listTitle">
                        <span className="name">郭靖</span>
                        <span className="identity">430951196212041234</span>
                        <span className="attestation"><em></em>已认证</span>
                    </div>
                    <div className="pic_id">
                        <span><img src="/client/asset/images/pic_id.jpg" /></span>
                        <span><img src="/client/asset/images/pic_id2.jpg" /></span>
                    </div>
                    <div className="feedbackInfo">
                        <p>身份信息审核内容反馈：反馈信息反馈信息......</p>
                    </div>
                    <div className="toolsArea">
                        <a href="#" className="pen"><em></em>编辑</a>
                        <a href="javascript:;" className="del"><em></em>删除</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;