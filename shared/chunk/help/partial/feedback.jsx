'use strict';

import React,{Component} from "react";

class Feedback extends Component{
    render(){
        const {changeScene} = this.props;
        return (
            <div className="help-content">
                <header className="header">
                    <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <span className="title">意见反馈</span>
                </header>
            </div>
        );
    }
}

export default Feedback;