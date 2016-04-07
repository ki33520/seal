'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Normal extends Component{
    render(){
        const {changeScene} = this.props;
        return (
            <div className="help-content">
                <header className="header">
                    <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <span className="title">在线客服</span>
                </header>
            </div>
        );
    }
}

export default Normal;