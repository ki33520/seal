'use strict'

import React,{Component} from "react";
import HelpMain from "./partial/main.jsx";
import Question from "./partial/question.jsx";
import Normal from "./partial/normal.jsx";
import Shipment from "./partial/shipment.jsx";
import Tariff from "./partial/tariff.jsx";
import Parcel from "./partial/parcel.jsx";
import Onlineservice from "./partial/onlineservice.jsx";
import Feedback from "./partial/feedback.jsx";
import {Router} from "director";
import {Switcher,SwitcherCase} from "../common/switcher.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

import {alert} from "../common/action.es6";

class HelpList extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuestion: 0
        }
    }
    handleSceneChange(currentScene,key){
        const {fetchHotWord} = this.props
        switch(currentScene){
            case "question":
                this.setState({
                    currentQuestion: key
                });
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><HelpMain {...this.props}/></Scene>
                <Scene name="question"><Question currentQuestion={this.state.currentQuestion} {...this.props}/></Scene>
            </SceneGroup>
        );
    }

}


export default HelpList;