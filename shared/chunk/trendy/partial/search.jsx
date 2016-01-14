'use strict';

import React,{Component} from "react";
import {fetchHotWord,changeField,fetchAssociateKeywords} from "../action.es6"

class SearchBox extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props
        dispatch(fetchHotWord())
    }
    renderHotWord(){
        let {hotwords} = this.props;
        if(hotwords){
            return hotwords.map((hotword,i)=>{
                return <a href={"/goodlist?searchKey="+hotword.name} key={i}>{hotword.name}</a>
            })
        }
        return null
    }
    handleSearch(e){
        e && e.preventDefault();
        const keyword = e.target.value;
        const {dispatch} = this.props;
        dispatch(changeField({
            keyword
        }));
        dispatch(fetchAssociateKeywords({
            keyword
        }));
    }
    handleReset(e){
        e && e.preventDefault();
        const {dispatch} = this.props;
        dispatch(changeField({
            keyword:null
        }));
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
        const {keyword} = this.props;
        return (
            <div className="searchOut">
                <a href={"/goodlist?searchKey="+keyword}>{keyword}</a>
            </div>
        )
    }
    render(){
        const {keyword} = this.props;
        return (
            <div className="search-wrap">
                <div className="search-header">
                    <div className="search-box">
                        <input id="search-box" type="search" placeholder="寻找宝贝"
                        value={keyword} 
                        onChange={this.handleSearch.bind(this)}/>
                        <span></span>
                        <div className="reset" onClick={this.handleReset.bind(this)}>
                            <i className="iconfont icon-close-fill"></i>
                        </div>
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