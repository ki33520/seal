'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import AddIDcard from "./partial/addidcard.jsx";
import UpdateIdcard from "./partial/updateidcard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IDcard extends Component{
    handleSceneChange(currentScene,param,prevScene){

    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><Index {...this.props}/></Scene>
                <Scene name="addcard"><AddIDcard {...this.props}/></Scene>
                <Scene name="update"><UpdateIdcard {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IDcard;