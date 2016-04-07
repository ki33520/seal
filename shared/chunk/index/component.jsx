'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "../common/search.jsx";
import {Router} from "director";
import {SceneGroup,Scene} from "../common/scene.jsx"

class IndexRouter extends Component{
    handleSceneChange(currentScene,prevScene){
        const {fetchHotWord,fetchSearchHistory} = this.props
        switch(currentScene){
            case "search":
                !this.props.search.hotwordFetched && fetchHotWord()
                !this.props.search.historyFetched && fetchSearchHistory()
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)} scrollable={false}>
                <Scene name="index" scrollable={false}><Index {...this.props}/></Scene>
                <Scene name="search"><SearchBox {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IndexRouter;