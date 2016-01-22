'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class HelpMain extends Component{
    renderQuestion(){
        const {questionList,changeScene} = this.props;
        return (
            <div>
                <ul className="list">
                    {
                        questionList.map((v,k)=>{
                            return (
                                <li key={k}><a href="javascript:void(null)" onClick={changeScene.bind(this,"question",k)}>{v.questionName}</a></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
        // <ul className="list">
        //             <li><a href="javascript:void(null)" onClick={changeScene.bind(this,"onlineservice")}>没有解决问题？咨询在线客服</a></li>
        //             <li><a href="javascript:void(null)" onClick={changeScene.bind(this,"feedback")}>意见反馈<span className="tips">(产品建议、系统问题等)</span></a></li>
        //             <li>
        //                 <a>
        //                     <div className="left-col"><span className="iconfont icon-phone">400-848-9448</span></div>
        //                     <div className="right-col">
        //                         <span>客服电话</span>
        //                         <span>09:00-21:30</span>
        //                     </div>
        //                 </a>
        //             </li>
        //         </ul>
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