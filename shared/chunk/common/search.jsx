'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {fetchHotWord} from "./action.es6"
import Dialog from "../../component/dialog.jsx";
import {jumpURL} from "../../lib/jumpurl.es6";

class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            dialogActive:false,
            dialogMsg:""
        }
    }
    renderHotWord(){
        let {hotwords} = this.props.search;
        if(hotwords){
            return hotwords.map((hotword,i)=>{
                return <a href={jumpURL("search",null,{k:hotword.name})} key={i}>{hotword.name}</a>
            })
        }
        return null
    }
    handleSearch(e){
        e && e.preventDefault()
        const {changeField,fetchAssociateKeywords} = this.props;
        changeField("keyword",e.target.value)
        fetchAssociateKeywords({
            keyword:e.target.value
        })
    }
    handleSubmit(e){
        const {keyword} = this.props.search
        if(keyword === ""){
            return
        }
        location.assign(jumpURL("search",null,{k:keyword}))
    }
    handleReset(e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField('keyword',null)
    }
    renderHistory(){
        if(this.props.search.history && this.props.search.history.length > 0){
            let history = this.props.search.history.map((record,i)=>{
                return <a href={jumpURL("search",null,{k:record.keyword})} key={i}>{record.keyword}</a>
            })
            history = history.slice(0,10)
            return (
                <div className="searchList">
                    <span className="clearfix">
                        <em>历史搜索</em>
                        <i onClick={this.shouldPurgeHistory.bind(this)}>清空记录</i>
                    </span>
                    {history}
                </div>
            )
        }
        return null
    }
    toggleDialog(){
        this.setState({
            dialogActive:!this.state.dialogActive
        })
    }
    shouldPurgeHistory(e){
        e & e.preventDefault()
        this.setState({
            dialogActive:true,
            dialogOnConfirm:()=>{
                this.toggleDialog()
                this.handlePurgeHistory()
            }
        })
    }
    handlePurgeHistory(){
        // e && e.preventDefault()
        this.props.purgeSearchHistory()
    }
    renderSearchList(){
        return (
            <div className="searchbox-list">
                <div className="searchHot clearfix">
                    <span>热搜</span>
                    <div>{this.renderHotWord()}</div>
                </div>
                {this.renderHistory()}
            </div>
        )
    }
    renderAssociate(){
        const {keyword,associateWords} = this.props.search;
        if(associateWords && associateWords.length > 0){
            return associateWords.map((associateWord,i)=>{
                return (
                <div className="searchOut" key={i}>
                    <a href={jumpURL("search",null,{k:associateWord.name})}>{associateWord.name}</a>
                </div>
                )
            })
        }
        return (
            <div className="searchOut">
                <a href={jumpURL("search",null,{k:keyword})}>{keyword}</a>
            </div>
        )
    }
    render(){
        const {keyword} = this.props.search;
        const resetClasses = classNames("reset",{
            active:!!keyword
        })
        const btnClasses = classNames("search-btn",{
            enabled:!!keyword
        })
        return (
            <div className="search-wrap">
                <div className="search-header">
                    <a href="javascript:;" onClick={this.props.changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                    <div className="search-box">
                        <input id="search-box" type="search" placeholder="寻找宝贝"
                        value={keyword} 
                        onChange={this.handleSearch.bind(this)}/>
                        <span></span>
                        <div className={resetClasses} onClick={this.handleReset.bind(this)}><i className="iconfont icon-close-fill"></i></div>
                    </div>
                    <div className={btnClasses} onClick={this.handleSubmit.bind(this)}>搜索</div>
                </div>
                {keyword?this.renderAssociate():this.renderSearchList()}
                <Dialog active={this.state.dialogActive} 
                onCancel={this.toggleDialog.bind(this)} 
                onConfrim={this.state.dialogOnConfirm}>确定清空搜索记录吗?</Dialog>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    keyword:""
}

export default SearchBox;