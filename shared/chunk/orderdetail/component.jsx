'use strict';

import React,{Component} from "react";
import OrderDetail from "./partial/orderdetail.jsx";
import Logistics from "./partial/logistics.jsx";
import Comment from "./partial/comment.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class OrderDetailRouter extends Component{
    handleSceneChange(currentScene,param){
    }
    render(){
        const {currentRoute,prevRoute} = this.state;
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
            <Scene name="index"><OrderDetail {...this.state} {...this.props}/></Scene>
            <Scene name="logistics"><Logistics {...this.state} {...this.props}/></Scene>
            <Scene name="comment"><Comment {...this.state} {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default OrderDetailRouter;