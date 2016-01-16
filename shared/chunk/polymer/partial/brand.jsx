'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Brand extends Component{
    constructor(props){
        super(props);
    }
    renderRecommendBrands(){
        let {recommendBrands} = this.props.categoryBrands
        if(recommendBrands){
            return recommendBrands.map((brand,i)=>{
                return <a href="#" key={i}><div><img src={brand.imageUrl}/></div></a>
            })
        }
        return null
    }
    renderCategory(){
        let {categories} = this.props.categoryBrands
        if(categories){
            return categories.map((category,i)=>{
                let brands = category.brands.map((brand,k)=>{
                    return <a href="#" key={k}><div><img src={brand.imageUrl}/></div></a>
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
        return (
            <div className="poly_2">
                <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"allbrands")} 
                className="allBrand">全部品牌<i className="iconfont icon-right"></i></a>
                <div className="title">推荐品牌</div>
                <div className="brandList clearfix">{this.renderRecommendBrands()}</div>
                {this.renderCategory()}
            </div>
        )
    }
}

export default Brand