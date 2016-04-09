'use strict';

import React,{Component} from "react";
import Swipelist from "../../common/swipelist.jsx";

class PhotoList extends Component{
    render(){
        var {photos,changeScene} = this.props;
        var imgList = photos && photos.data ? photos.data : [];
        var activeIndex = photos && photos.activeIndex ? photos.activeIndex : 0;
        return (
            <Swipelist onGoBack={changeScene.bind(this,"index")} activeIndex={activeIndex} imgList={imgList} />
        )
    }
}

export default PhotoList;