'use strict';

import React,{Component} from "react";
import Receiver from "./partial/receiver.jsx";
import AddReceiver from "./partial/addreceiver.jsx";
import UpdateReceiver from "./partial/updatereceiver.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

import {fetchReceiver} from "./action.es6";

class ReceiverRouter extends Component{
    handleSceneChange(currentScene,param,prevScene){
        const {fetchReceiver,fetchReceivers} = this.props
        switch(currentScene){
            case "updatereceiver":
                !this.props.updateReceiver.receiverFetching && fetchReceiver("/receiver/"+param.id)
            case "index":
                // prevScene === null && fetchReceivers()
                // param.needUpdated && fetchReceivers()
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)} 
            defaultScene={this.props.receiverByUser.defaultScene}>
                <Scene name="index">
                    <Receiver {...this.props.receiverByUser} {...this.props}/>
                </Scene>
                <Scene name="addreceiver">
                    <AddReceiver {...this.props.addReceiver} {...this.props}/>
                </Scene>
                <Scene name="updatereceiver">
                    <UpdateReceiver {...this.props.updateReceiver} {...this.props}/>
                </Scene>
            </SceneGroup>
        );
    }
}

export default ReceiverRouter;