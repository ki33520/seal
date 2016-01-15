'use strict';

import React,{Component} from "react";
import {fetchHotWord} from "../action.es6"

class SearchBox extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props
        dispatch(fetchHotWord())
    }
    renderHotWord(){
        let {hotwords} = this.props.search;
        if(hotwords){
            return hotwords.map((hotword,i)=>{
                return <a href={"/goodlist/"+hotword.name} key={i}>{hotword.name}</a>
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
    renderSearchList(){
        return (
            <div className="searchbox-list">
                <div className="searchHot clearfix">
                    <span>热搜</span>
                    <div>{this.renderHotWord()}</div>
                </div>
                <div className="searchList">
                    <span className="clearfix">
                        <em>历史搜索</em>
                        <i>清空记录</i>
                    </span>
                    <a href="/goodlist">洗衣液</a>
                    <a href="/goodlist">洗衣液</a>
                    <a href="/goodlist">洗衣液</a>
                </div>
            </div>
        )
    }
    renderAssociate(){
        const {keyword} = this.props.search;
        return (
            <div className="searchOut">
                <a href={"/goodlist/"+keyword}>{keyword}</a>
            </div>
        )
    }
    render(){
        const {keyword} = this.props.search;
        return (
            <div className="search-wrap">
                <div className="search-header">
                    <div className="search-box">
                        <input id="search-box" type="search" placeholder="寻找宝贝"
                        value={keyword} 
                        onChange={this.handleSearch.bind(this)}/>
                        <span></span>
                        <div className="reset" onClick={this.handleReset.bind(this)}><i className="iconfont icon-close-fill"></i></div>
                    </div>
                    <div className="search-btn"><a href="#/">取消</a></div>
                </div>
                {keyword?this.renderAssociate():this.renderSearchList()}
            </div>
        )
    }
}

SearchBox.defaultProps = {
    keyword:""
}

export default SearchBox;