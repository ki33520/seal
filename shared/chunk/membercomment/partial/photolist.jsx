'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import {SlideTabs,SlideTabsItem} from "../../../component/slidetabs.jsx";
import Header from "../../common/header.jsx";

class PhotoList extends Component{
    constructor(props){
        super(props);
        var {photos} = props;
        if(photos){
            this.state = {
                titleName: photos.activeIndex+1+" / "+photos.data.length,
                displayFlag: photos.activeIndex
            }
        }
    }
    componentDidUpdate(){
        var {photos} = this.props;
        console.log(photos)
        if(photos){
            console.log(ReactDOM.findDOMNode(this.refs["slideTabs"]).children[1].children[photos.activeIndex])
            ReactDOM.findDOMNode(this.refs["slideTabs"]).children[1].children[photos.activeIndex].click();
        }
    }
    toggleFlag(index){
        var {photos} = this.props;
    }
    render(){
        var {photos} = this.props;
        var {showComment} = this.props.commentByUser;
        if(photos){
            var titleName = photos.activeIndex+1+" / "+photos.data.length;
            var displayFlag = photos.activeIndex;
            return (
                <div className="photo-content">
                    <Header onGoBack={this.props.changeScene.bind(this,"index")}>
                        <span className="title">晒单图片</span>
                    </Header>
                    <SlideTabs ref="slideTabs" axis="x" activeIndex={displayFlag} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)} >
                        {
                            photos.data.map((v,k)=>{
                                var t = k+1+" / "+photos.data.length;
                                return (
                                    <SlideTabsItem key={k} navigator={()=><span><b>{t}</b></span>}>
                                        <img src={v} />
                                    </SlideTabsItem>
                                )
                            })
                        }
                    </SlideTabs>
                </div>
            )
        }else{
            return null;
        }
        
    }
}

export default PhotoList;