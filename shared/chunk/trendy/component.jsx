'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "../common/search.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class TrendyRouter extends Component{
    handleSceneChange(currentScene,prevScene){
        const {fetchHotWord,search} = this.props
        switch(currentScene){
            case "search":
                !search.hotwordFetched && fetchHotWord();
                break;
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index" scrollable={false}><Index {...this.props}/></Scene>
                <Scene name="search"><SearchBox {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default TrendyRouter;