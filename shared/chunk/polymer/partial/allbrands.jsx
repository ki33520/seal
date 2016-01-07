'use strict';

import React,{Component} from "react";
import Header from "../../common/header.jsx";
import ScrollNav from "../../../component/scrollnav.jsx";
import _ from "lodash";

class AllBrands extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {fetchAllBrands} = this.props;
        fetchAllBrands()
    }
    renderBrand(){
        let {brands} = this.props.allBrand;
        if(brands){
            let brandGroup = []
            for(let key in brands){
                let brandGroupItems = brands[key].map((brand,i)=>{
                    return  <li key={i}>{brand}</li>
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
                <Header>全部品牌</Header>
                <div className="all-brands-inner">
                <ScrollNav className="all-brands-list" navbarRenderer={navbarRenderer}>
                {this.renderBrand()}
                </ScrollNav>
                </div>
            </div>
        )
    }
}

export default AllBrands