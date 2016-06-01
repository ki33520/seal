'use strict';

import React,{Component} from "react";
import IDcard from "./partial/idcard.jsx";
import AddIDcard from "./partial/addidcard.jsx";
import UpdateIdcard from "./partial/updateidcard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IDcardRouter extends Component{
    handleSceneChange(currentScene,param,prevScene){
        switch(currentScene){
            case "updatecard":
                //console.log(param)
                //!this.props.updateReceiver.receiverFetching && fetchReceiver("/receiver/"+param.id)
            case "index":
                console.log(param,prevScene)
                // prevScene === null && fetchReceivers()
                this.props.fetchCardList()
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><IDcard {...this.props.cardID} {...this.props}/></Scene>
                <Scene name="addcard"><AddIDcard {...this.props.addCardID} {...this.props}/></Scene>
                <Scene name="updatecard"><UpdateIdcard {...this.props.updateCardID} {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IDcardRouter;