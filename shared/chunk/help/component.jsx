'use strict'

import React,{Component} from "react";
import HelpMain from "./partial/main.jsx";
import Question from "./partial/question.jsx";
import Onlineservice from "./partial/onlineservice.jsx";
import Feedback from "./partial/feedback.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"
import {urlPrefix} from "../../lib/jumpurl.es6";

class HelpList extends Component{
    constructor(props){
        super(props);
        const {questionCategory} = props;
    }
    handleSceneChange(currentScene,value){
        switch(currentScene){
            case "question":
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><HelpMain {...this.props}/></Scene>
                <Scene name="question"><Question {...this.props}/></Scene>
                <Scene name="onlineservice"><Onlineservice {...this.props}/></Scene>
                <Scene name="feedback"><Feedback {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default HelpList;