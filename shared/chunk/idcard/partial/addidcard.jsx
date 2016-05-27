'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class AddIDcard extends Component{
    handleBack(){
        this.props.changeScene("index");
    }
    render(){
        return (
            <div className="idcard-content">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span className="title">上传身份证</span>
                </Header>
                <div className="upload-idcard">
                     
                </div>
            </div>
        )
    }
}

export default AddIDcard;