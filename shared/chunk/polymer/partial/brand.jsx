'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Brand extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {fetchCategoryBrands} = this.props;
        fetchCategoryBrands()
    }
    render(){
        return (
            <div>
                <a href="#" className="allBrand">全部品牌<i className="iconfont icon-right"></i></a>
                <div className="title">推荐品牌</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
                <div className="title">母婴用品</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
                <div className="title">母婴用品</div>
                <div className="brandList clearfix">
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                    <a href="#"><div><img src="/client/asset/images/pic25.gif"/></div></a>
                </div>
            </div>
        )
    }
}

export default Brand