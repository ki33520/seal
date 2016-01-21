'use strict';

import React,{Component} from "react";
import GoodDetail from "./partial/gooddetail.jsx";
import GoodComment from "./partial/comment.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class GoodDetailRouter extends Component{
    handleSceneChange(currentScene,prevScene){

    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
            <Scene name="index"><GoodDetail {...this.props}/></Scene>
            <Scene name="comment"><GoodComment {...this.props}/></Scene>
            </SceneGroup>
        );    
    }
}

export default GoodDetailRouter;