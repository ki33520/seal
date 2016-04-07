'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class HelpMain extends Component{
    renderQuestion(){
        const {questionCategory,changeScene} = this.props;
        const {result} = questionCategory;
        return (
            <div>
                <ul className="list">
                    {
                        result.map((v,k)=>{
                            return (
                                <li key={k}><a href="javascript:void(null)" onClick={changeScene.bind(this,"question",v)}>{(k+1)+"."}{v.catalogName}</a></li>
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
                    <span className="title">帮助与反馈</span>
                </Header>
                <h2>常见问题</h2>
                {this.renderQuestion()}
            </div>
        );
    }
}

export default HelpMain;