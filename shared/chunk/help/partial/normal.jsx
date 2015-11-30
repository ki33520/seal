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
                    <h1>注册登陆常见问题</h1>
                </Header>
            </div>
        );
    }
}

export default Normal;