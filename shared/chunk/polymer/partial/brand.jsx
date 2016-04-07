'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Loading from "../../common/loading.jsx";
import _ from "lodash";
import {jumpURL} from "../../../lib/jumpurl.es6";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import GoTop from "../../../component/gotop.jsx";

class Brand extends Component{
    constructor(props){
        super(props);
    }
    renderRecommendBrands(){
        let {recommendBrands} = this.props.categoryBrands
        if(recommendBrands){
            return recommendBrands.map((brand,i)=>{
                return <a href={jumpURL("search",null,{brandName:brand.chineseName})} key={i}><div>
                <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                <Image src={brand.imageUrl} 
                transitionName="fade" placeholder={()=><div className="brand-placeholder"></div>}
                >
                </Image>
                </LazyLoad>
                </div></a>
            })
        }
        return null
    }
    renderCategory(){
        let {categories} = this.props.categoryBrands
        if(categories){
            return categories.map((category,i)=>{
                let brands = category.brands.map((brand,k)=>{
                    return <a href={jumpURL("search",null,{brandName:brand.chineseName})} key={k}><div><img src={brand.imageUrl}/></div></a>
                })
                if(brands){
                    return (
                        <div className="category-brands" key={i}>
                            <div className="title">{category.name}</div>
                            <div className="brandList clearfix">{brands}</div>
                        </div>
                    )
                }
                return null
            })
        }
        return null
    }
    render(){
        const isFetching = _.isEmpty(this.props.categoryBrands) ? true
            :this.props.categoryBrands.categoryBrandsFetching
        return (
            <GoTop relative={true}>
            <div className="poly_2">
                <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"allbrands")} 
                className="allBrand">全部品牌<i className="iconfont icon-right"></i></a>
                <div className="title">推荐品牌</div>
                <div className="brandList clearfix">{this.renderRecommendBrands()}</div>
                {this.renderCategory()}
                <Loading active={isFetching}/>
            </div>
            </GoTop>
        )
    }
}

export default Brand