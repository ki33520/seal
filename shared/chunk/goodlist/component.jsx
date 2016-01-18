'use strict';

import React,{Component} from "react";
import Index from "./partial/index.jsx";
import SearchBox from "./partial/search.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";
import {fetchHotWord} from "./action.es6";

class IndexRouter extends Component{
    handleSceneChange(currentScene,prevScene){
        const {dispatch} = this.props
        switch(currentScene){
            case "search":
                !this.props.hotwordFetched && dispatch(fetchHotWord())
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><Index {...this.props}/></Scene>
                <Scene name="search"><SearchBox {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IndexRouter;