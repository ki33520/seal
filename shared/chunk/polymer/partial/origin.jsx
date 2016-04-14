'use strict';

import React,{Component} from "react";
import Loading from "../../common/loading.jsx";
import _ from "../../../lib/lodash.es6";
import {jumpURL} from "../../../lib/jumpurl.es6";
import LazyLoad from "../../../component/lazyload/lazyload.jsx";
import Image from "../../../component/lazyload/image.jsx";
import GoTop from "../../../component/gotop.jsx";

class Origin extends Component{
    constructor(props){
        super(props);
    }
    renderOrigin(){
        let {origins} = this.props.allOrigin
        if(origins){
            return origins.map((origin,i)=>{
                return <a href={jumpURL("search",null,{areaName:origin.name})} key={i}>
                <LazyLoad relative={true} relativeSelector="back-to-top-inner">
                <Image src={origin.backgroundImageUrl} 
                transitionName="fade" placeholder={()=><div className="origin-placeholder"></div>}
                >
                </Image>
                </LazyLoad>
                </a>
            })
        }
        return null        
    }
    render(){
        const isFetching = _.isEmpty(this.props.allOrigin) ? true
            :this.props.allOrigin.originFetching
        return (
            <GoTop relative={true}>
            <div>
                <div className="kindArea">
                {this.renderOrigin()}
                </div>
                <Loading active={isFetching}/>
            </div>
            </GoTop>
        )
    }
}

export default Origin