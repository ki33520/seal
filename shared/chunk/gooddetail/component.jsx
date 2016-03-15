'use strict';

import React,{Component} from "react";
import GoodDetail from "./partial/gooddetail.jsx";
import GoodComment from "./partial/comment.jsx";
import Tariff from "./partial/tariff.jsx";
import Thumbnail from "./partial/thumbnail.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class GoodDetailRouter extends Component{
    handleSceneChange(currentScene,param){
        const {fetchComments} = this.props
        switch(currentScene){
            // case "comment":
                // !this.props.commentsFetched && fetchComments(param)
            case "thumbnail":
                this.props.selectCommentImage(param.index,param.list)
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
            <Scene name="index"><GoodDetail {...this.props}/></Scene>
            <Scene name="comment"><GoodComment {...this.props}/></Scene>
            <Scene name="tariff"><Tariff {...this.props}/></Scene>
            <Scene name="thumbnail"><Thumbnail {...this.props}/></Scene>
            </SceneGroup>
        );    
    }
}

export default GoodDetailRouter;