'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";


class Question extends Component{
    render(){
        const {questionList,currentQuestion,changeScene} = this.props;
        const question = questionList[currentQuestion];
        return (
            <div className="help-content">
                <header className="header">
                    <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <span className="title">常见问题</span>
                </header>
                <div className="help-text">
                    <h3>{question.questionName}</h3>
                    <p>{question.solution}</p>

                </div>
            </div>
        );
    }
}

export default Question;