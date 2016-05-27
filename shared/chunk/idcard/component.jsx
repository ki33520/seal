'use strict';

import React,{Component} from "react";
import IDcard from "./partial/index.jsx";
import AddIDcard from "./partial/addidcard.jsx";
import UpdateIdcard from "./partial/updateidcard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IndexRouter extends Component{
    handleSceneChange(currentScene,param){
        
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><IDcard {...this.props}/></Scene>
                <Scene name="addcard"><AddIDcard {...this.props}/></Scene>
                <Scene name="update"><UpdateIdcard {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IndexRouter;