'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";

class Question extends Component{
    getQuestion(){
        const {fetchQuestion,currentQuestion} = this.props;
        console.log(currentQuestion.id)
        fetchQuestion("/question",{
            catalogId: currentQuestion.id,
            start: 0,
            limit: 10
        });
    }
    componentDidMount(){
        this.getQuestion();
    }
    renderList(){
        const {questionList} = this.props.questionByForm;
        if(questionList){
            const {result} = questionList;
            return   (
                <div className="help-text">
                {
                    result.map((v,k)=>{
                            console.log(v);
                            return (
                                <div key={k} className="help-item">
                                    <div>{v.questionName}</div>
                                    <div>{v.solution}</div>
                                </div>
                            )
                    })
                }
                </div>
            )
        }else{
            return null;
        }
        
    }
    render(){
        const {currentQuestion,changeScene} = this.props;
        const {catalogName} =  currentQuestion;
        return (
            <div className="help-content">
                <header className="header">
                    <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <span className="title">{catalogName}</span>
                </header>
                {this.renderList()}
            </div>
        );
    }
}

export default Question;