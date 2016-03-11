'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Header from "../../common/header.jsx";
import Swipelist from "../../common/swipelist.jsx";

class PhotoList extends Component{
    componentDidUpdate(){
        var {photos} = this.props;
        if(photos){
            ReactDOM.findDOMNode(this.refs["swipelist"]).children[1].children[1].children[photos.activeIndex].click();
        }
    }
    toggleFlag(index){
        var {photos} = this.props;
    }
    render(){
        var {photos,changeScene} = this.props;
        var imgList = photos && photos.data ? photos.data : [];
        var activeIndex = photos && photos.activeIndex ? photos.activeIndex : 0;
        return (
            <Swipelist ref="swipelist" onGoBack={changeScene.bind(this,"index")} activeIndex={activeIndex} imgList={imgList} />
        )
        
    }
}

export default PhotoList;