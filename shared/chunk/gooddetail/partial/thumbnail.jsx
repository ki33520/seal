'use strict';

import React,{Component} from "react";
import Swipelist from "../../common/swipelist.jsx";

class Thumbnail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {selectedCommentImageIndex,selectedCommentImages} = this.props.goodById;
        return (
            <div className="comment-thumbnail">
            <Swipelist slidesIndex={1} swiperPagination="swiper-pagination-1" onGoBack={this.props.changeScene.bind(this,"comment")} imgList={selectedCommentImages} activeIndex={selectedCommentImageIndex}/>
            </div>
        )
    }
}

export default Thumbnail