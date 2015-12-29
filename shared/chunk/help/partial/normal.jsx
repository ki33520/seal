'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Normal extends Component{
    render(){
        const {helpInfo} = this.props;
        return (
            <div className="help-content">
                <Header>
                    <span className="title">注册登陆常见问题</span>
                </Header>
            </div>
        );
    }
}

export default Normal;