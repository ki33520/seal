'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {urlPrefix} from "../../../lib/jumpurl.es6";

class HelpMain extends Component{
    componentDidMount(){
        const {user} = this.props
        const memberId = user?user.memberId:""
        const username = user?user.nickName:""
        window.NTKF_PARAM = {
            siteid:"ay_1000",                       //企业ID，,为固定值
            settingid:"ay_1000_9999",               //接待组ID，为固定值，必填
            uid:memberId,                            //用户ID，未登录可以为空，但是不能给null，uid赋予的值显示到小能客户端
            uname:username,                //用户名，未登录可以为空，但是不能给null，uname赋予的值显示到小能客户端
            isvip:"0",                              //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端
            userlevel:"1",                          //网站自定义会员级别，1-N，可根据选择判断，取值显示到小能客户端
            erpparam:"abc"                          //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
        }
    }
    handleChangeScene(value){
        const {fetchQuestion,changeScene} = this.props;
        fetchQuestion(urlPrefix+"/question",{
            catalogName: value.catalogName,
            catalogId: value.id,
            start: 1
        });
        changeScene.call(this,"question");
    }
    handleKF(e){
        e && e.preventDefault()
        if(typeof window.NTKF !== "undefined"){
            NTKF.im_openInPageChat('ay_1000_9999')
        }
    }
    renderQuestion(){
        const {questionCategory} = this.props;
        const {result} = questionCategory;
        return (
            <div>
                <ul className="list">
                    {
                        result.map((v,k)=>{
                            return (
                                <li key={k}><a href="javascript:void(null)" onClick={this.handleChangeScene.bind(this,v)}>{(k+1)+"."}{v.catalogName}</a></li>
                            )
                        })
                    }
                </ul>
                <ul className="list">
                    <li><a href="javascript:void(null)" onClick={this.handleKF.bind(this)}>没有解决问题?咨询在线客服</a></li>
                    <li>
                        <a href="tel:4008489448">
                            <div className="left-col"><span className="iconfont icon-phone">400-848-9448</span></div>
                            <div className="right-col">
                                <span>客服电话</span>
                                <span>09:00-21:30</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
    render(){
        return (
            <div className="help-content">
                <Header>
                    <span className="title">帮助反馈</span>
                </Header>
                <h2>常见问题</h2>
                {this.renderQuestion()}
            </div>
        );
    }
}

export default HelpMain;