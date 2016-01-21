'use strict';

import React,{Component} from "react";
import {fetchAssociateKeywords} from "../action.es6"

class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }
    renderHotWord(){
        let {hotwords} = this.props;
        if(hotwords){
            return hotwords.map((hotword,i)=>{
                return <a href={"/search?k="+hotword.name} key={i}>{hotword.name}</a>
            })
        }
        return null
    }
    handleSearch(e){
        e && e.preventDefault();
        let keyword = e.target.value;
        let {dispatch} = this.props;
        this.setState({
            keyword
        })
 
        dispatch(fetchAssociateKeywords({
            keyword
        }))
    }
    handleReset(e){
        e && e.preventDefault();
        this.setState({
            keyword:null
        })
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
                    <a href="/search?k=洗衣液">洗衣液</a>
                    <a href="/search?k=洗衣液">洗衣液</a>
                    <a href="/search?k=洗衣液">洗衣液</a>
                </div>
            </div>
        )
    }
    renderAssociate(){
        let {associatewords} = this.props;
        let result = []
        if(associatewords && associatewords.length){
            associatewords.map((word,i)=>{
                result.push(<a href={"/search?k="+word.name} key={i}>{word.name}</a>);
            })
        }else{
            let {keyword} = this.state;
            result = (<a href={"/search?k="+keyword}>{keyword}</a>)
        }
        return (
            <div className="searchOut">
                {result}
            </div>
        )
    }
    render(){
        const {keyword} = this.state;
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
                    <div className="search-btn"><a href="javascript:void(null)" 
                    onClick={this.props.changeScene.bind(this,"index")}>取消</a></div>
                </div>
                {keyword?this.renderAssociate():this.renderSearchList()}
            </div>
        )
    }
}

export default SearchBox;