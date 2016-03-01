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
    toggleFlag(index){
        var {photos} = this.props;
    }
    render(){
        var {photos,changeScene} = this.props;
        var {showComment} = this.props.commentByUser;
        if(photos){
            var titleName = photos.activeIndex+1+" / "+photos.data.length;
            var displayFlag = photos.activeIndex;
            return (
                <div className="photo-content">
                    <SlideTabs ref="slideTabs" axis="x" activeIndex={0} navbarSlidable={false} onSelect={this.toggleFlag.bind(this)} >
                        {
                            photos.data.map((v,k)=>{
                                var t = k+1+" / "+photos.data.length;
                                return (
                                    <SlideTabsItem key={k} navigator={()=>{ 
                                        return (
                                            <span className="header">
                                                <a href="javascript:void(null)" onClick={changeScene.bind(this,"index")} className="iconfont icon-back"></a>
                                                <b>{t}</b>
                                            </span>
                                        )
                                    }}>
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