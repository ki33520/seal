'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import CouponDetail from "./partial/detail.jsx";
import CouponRules from "./partial/rules.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IndexRouter extends Component{
    handleSceneChange(currentScene,param){
        switch(currentScene){
            case "detail":
                this.props.fetchCouponDetail(param);
                break;
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><Index {...this.props}/></Scene>
                <Scene name="detail"><CouponDetail {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IndexRouter;