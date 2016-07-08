'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Header from "../../common/header.jsx";
import GoTop from "../../../component/gotop.jsx";
import Refresher from "../../../component/refresher.jsx";
import {urlPrefix} from "../../../lib/jumpurl.es6";

class Question extends Component{
    beginRefresh(){
        const {dispatch,fetchQuestion} = this.props;
        const {questionList,isFetching} = this.props.questionByForm;
        var pageCount = questionList.pageCount;
        var pageIndex = questionList.pageIndex;
        var nextPage = pageIndex + 1;
        if(pageCount < nextPage){
            return false;
        }
        if(isFetching === true){
            return false;
        }
        fetchQuestion(urlPrefix+"/question",{
            catalogId: questionList.catalogId,
            catalogName: questionList.catalogName,
            start: nextPage
        });
    }
    renderList(){
        const {questionList,isFetching} = this.props.questionByForm;
        if(questionList && questionList.list && questionList.list.length > 0){
            const {list} = questionList;
            return   (
                <div className="question-list">
                {
                    list.map((v,k)=>{
                        return (
                            <div key={k} className="question-item">
                                <h3>{(k+1)+"."}{v.questionName}</h3>
                                <p>{v.solution}</p>
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
    handleScroll(scrollNode,scrollTop){
        if((scrollNode.offsetHeight + scrollTop + 30) >= scrollNode.scrollHeight){
            this.beginRefresh()
        }
    }
    render(){
        const {changeScene} = this.props;
        const {questionList,isFetching} = this.props.questionByForm;
        return (
            <div className="question-content">
                <header className="header">
                    <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <span className="title">{questionList && questionList.catalogName}</span>
                </header>
                <div className="question-list-wrap">
                    <GoTop relative={true} onScroll={this.handleScroll.bind(this)}>
                    {this.renderList()}
                    <Refresher active={isFetching} />
                    </GoTop>
                </div>
            </div>
        );
    }
}

export default Question;