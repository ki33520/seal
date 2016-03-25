'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {fetchHotWord} from "../action.es6"
import Dialog from "../../../component/dialog.jsx";

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
                return <a href={"/search?k="+hotword.name} key={i}>{hotword.name}</a>
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
    handleReset(e){
        e && e.preventDefault();
        const {changeField} = this.props;
        changeField('keyword',null)
    }
    renderHistory(){
        if(this.props.search.history && this.props.search.history.length > 0){
            let history = this.props.search.history.map((keyword,i)=>{
                return <a href={"/search?k="+keyword} key={i}>{keyword}</a>
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
                    <a href={"/search?k="+associateWord.name}>{associateWord.name}</a>
                </div>
                )
            })
        }
        return (
            <div className="searchOut">
                <a href={"/search?k="+keyword}>{keyword}</a>
            </div>
        )
    }
    render(){
        const {keyword} = this.props.search;
        const resetClasses = classNames("reset",{
            active:!!keyword
        })
        return (
            <div className="search-wrap">
                <div className="search-header">
                    <div className="search-box">
                        <input id="search-box" type="search" placeholder="寻找宝贝"
                        value={keyword} 
                        onChange={this.handleSearch.bind(this)}/>
                        <span></span>
                        <div className={resetClasses} onClick={this.handleReset.bind(this)}><i className="iconfont icon-close-fill"></i></div>
                    </div>
                    <div className="search-btn"><a href="javascript:void(null)" 
                    onClick={this.props.changeScene.bind(this,"index")}>取消</a></div>
                </div>
                {keyword?this.renderAssociate():this.renderSearchList()}
                <Dialog active={this.state.dialogActive} 
                onCancel={this.toggleDialog.bind(this)} 
                onConfrim={this.state.dialogOnConfirm}>确定清空历史记录?</Dialog>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    keyword:""
}

export default SearchBox;