'use strict';

import React,{Component} from "react";

class SearchBox extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="search-wrap">
                <div className="search-header">
                    <div className="search-box">
                        <input id="search-box" type="search" placeholder="寻找宝贝" />
                        <span></span>
                        <div className="reset"><i className="iconfont icon-closefill"></i></div>
                    </div>
                    <div className="search-btn"><a href="#/">取消</a></div>
                </div>
                <div className="searchHot clearfix">
                    <span>热搜</span>
                    <div>
                        <a href="/goodlist/1">洗衣液</a>
                        <a href="/goodlist/2">女士香水</a>
                        <a href="/goodlist/2">洗衣液</a>
                        <a href="/goodlist/2">女士香水</a>
                    </div>
                </div>
                <div className="searchList">
                    <span className="clearfix">
                        <em>历史搜索</em>
                        <i>清空记录</i>
                    </span>
                    <a href="/goodlist/2">洗衣液</a>
                    <a href="/goodlist/2">洗衣液</a>
                    <a href="/goodlist/2">洗衣液</a>
                </div>
                <div className="searchOut">
                    <a href="/goodlist/2">金利来</a>
                    <a href="/goodlist/2">金纺</a>
                    <a href="/goodlist/2">金立手机</a>
                </div>
            </div>
        )
    }
}

export default SearchBox;