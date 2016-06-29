'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import {urlPrefix} from "../../../lib/jumpurl.es6";

class HelpMain extends Component{
    handleChangeScene(value){
        const {fetchQuestion,changeScene} = this.props;
        fetchQuestion(urlPrefix+"/question",{
            catalogName: value.catalogName,
            catalogId: value.id,
            start: 1
        });
        changeScene.call(this,"question");
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