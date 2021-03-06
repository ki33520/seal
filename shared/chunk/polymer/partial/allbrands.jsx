'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import ScrollNav from "../../../component/scrollnav.jsx";
import _ from "../../../lib/lodash.es6";
import Loading from "../../common/loading.jsx";
import {jumpURL} from "../../../lib/jumpurl.es6";

class AllBrands extends Component{
    constructor(props){
        super(props);
    }
    renderBrand(){
        let {brands} = this.props.allBrand;
        if(brands){
            let brandGroup = []
            for(let key in brands){
                let brandGroupItems = []
                brands[key].forEach((brand,i)=>{
                    brandGroupItems.push(<li key={i}><a href={jumpURL("search",null,{brandName:brand.chineseName})}>{brand.chineseName}</a></li>)
                })
                brandGroup.push(
                    <div className="anchor-point" data-anchor="anchor-a" key={key}>
                    <h5>{key}</h5>
                    <ul>{brandGroupItems}</ul>
                    </div>
                )
            }
            return brandGroup
        }
        return null
    }
    render(){
        const {brands} = this.props.allBrand;
        const navbarRenderer = ()=>{
            let shortcuts = _.keys(brands)
            return shortcuts.map((v)=>{
                return (
                    <span>{v}</span>
                )
            })
        }
        return (
            <div className="all-brands">
                <Header onGoBack={this.props.changeScene.bind(this,"index")}>全部品牌</Header>
                <div className="all-brands-inner">
                <div className="all-brands-list">
                {this.renderBrand()}
                </div>
                </div>
                <Loading active={this.props.allBrand.brandsFetching}/>
            </div>
        )
    }
}

export default AllBrands