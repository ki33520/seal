'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import util from "../../../lib/util.es6";
import Header from "../../common/header.jsx";

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }
    render(){
        //const {idcardLIst} = this.props.index;
        //console.log(idcardLIst)
        return (
            <div className="idcard-content">
                <Header>
                    <span className="title">身份证管理</span>
                </Header>
                 
            </div>
        )
    }
}

export default Index;