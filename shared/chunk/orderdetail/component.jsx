'use strict';

import React,{Component} from "react";
import OrderDetail from "./partial/orderdetail.jsx";
import Logistics from "./partial/logistics.jsx";
import Comment from "./partial/comment.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class OrderDetailRouter extends Component{
    constructor(props){
        super(props);
        const {scene} = props.orderByParam;
        this.state = {
            defaultScene: scene ? scene : null,
            currentScene: scene ? scene : null,
            prevScene:null
        }
    }
    handleSceneChange(currentScene,param){
        this.setState({
            currentScene: currentScene
        });
    }
    render(){
        const {defaultScene,currentScene,prevScene} = this.state;
        const initScene = defaultScene ? defaultScene : "index";
        return (
            <SceneGroup defaultScene={initScene} onChange={this.handleSceneChange.bind(this)}>
            <Scene name="index"><OrderDetail {...this.state} {...this.props}/></Scene>
            <Scene name="logistics"><Logistics {...this.state} {...this.props}/></Scene>
            <Scene name="comment"><Comment {...this.state} {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default OrderDetailRouter;