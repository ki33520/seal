'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";

class UpdateIdcard extends Component{
    handleBack(){
         
        this.props.changeScene("update",{id:1});
    }
    render(){
        return (
            <div className="idcard-content">
                <Header onGoBack={this.handleBack.bind(this)}>
                    <span className="title">身份证</span>
                </Header>
                <div className="idcard">
                     
                </div>
            </div>
        )
    }
}

export default UpdateIdcard;