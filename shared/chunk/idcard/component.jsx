'use strict';

import React,{Component} from "react";
import IDcard from "./partial/idcard.jsx";
import AddIDcard from "./partial/addidcard.jsx";
import UpdateIdcard from "./partial/updateidcard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IDcardRouter extends Component{
    handleSceneChange(currentScene,prevScene){

    }
    render(){
        return (
            <SceneGroup>
                <Scene name="IDcard"><Index {...this.props}/></Scene>
                <Scene name="addcard"><AddIDcard {...this.props}/></Scene>
                <Scene name="update"><UpdateIdcard {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IDcardRouter;