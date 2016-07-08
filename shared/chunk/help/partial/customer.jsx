'use strict'

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class Customer extends Component{
    constructor(props) {
      super(props);
    
      this.state = {
        categoriesVisble:false,
        soldCategoriesVisble:false
      };
    }
    componentDidMount(){
        const {user} = this.props
        const memberId = user.memberId?user.memberId:""
        const username = user.nickName?user.nickName:""
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
    handleKF(settingid,catId){
        if(typeof window.NTKF !== "undefined"){
            NTKF.im_openInPageChat(settingid)
        }
    }
    renderCategories(settingid){
        if(!this.state.categoriesVisble){
            return null
        }
        return (
            <ul className="list customer-categories">
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>服饰</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>化妆品</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>母婴</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>轻奢</a></li>
            </ul>
        )
    }
    renderSoldCategories(settingid){
        if(!this.state.soldCategoriesVisble){
            return null
        }
        return (
            <ul className="list customer-categories">
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>服饰</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>化妆品</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>母婴</a></li>
                <li><a href="javascript:void(null)" onClick={()=>this.handleKF(settingid)}>轻奢</a></li>
            </ul>
        )
    }
    toggleCategories(){
        this.setState({
            categoriesVisble:!this.state.categoriesVisble,
            soldCategoriesVisble:false
        })
    }
    toggleSoldCategories(){
        this.setState({
            soldCategoriesVisble:!this.state.soldCategoriesVisble,
            categoriesVisble:false
        })
    }
    renderTypes(){
        return (
            <div>
                <ul className="list customer-list">
                    <li className={this.state.categoriesVisble?"category-visble":""}>
                        <a href="javascript:void(null)" onClick={this.toggleCategories.bind(this)}>售前咨询</a>
                        {this.renderCategories("ay_1000_1467876033724")}
                    </li>
                    <li className={this.state.soldCategoriesVisble?"category-visble":""}>
                        <a href="javascript:void(null)" onClick={this.toggleSoldCategories.bind(this)}>售后服务</a>
                        {this.renderSoldCategories("ay_1000_1467876172575")}
                    </li>
                    <li><a href="javascript:void(null)" onClick={()=>this.handleKF("ay_1000_1467876446372")}>会员服务</a></li>
                    <li><a href="javascript:void(null)" onClick={()=>this.handleKF("ay_1000_1467876499568")}>投诉建议</a></li>
                </ul>
            </div>
        )
    }
    render(){
        return (
            <div className="help-content">
                <Header>
                    <span className="title">请您选择咨询类型</span>
                </Header>
                {this.renderTypes()}
            </div>
        )
    }
}

export default Customer