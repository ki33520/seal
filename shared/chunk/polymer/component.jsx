'use strict';

import React,{Component} from "react";
import Polymer from "./partial/polymer.jsx";
import AllBrands from "./partial/allbrands.jsx";
import SearchBox from "../common/search.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

class PolymerRouter extends Component{
    handleSceneChange(currentScene,prevScene){
        const {fetchHotWord,fetchSearchHistory,fetchAllBrands} = this.props
        switch(currentScene){
            case "search":
                !this.props.search.hotwordFetched && fetchHotWord()
                !this.props.search.historyFetched && fetchSearchHistory()
                break
            case "allbrands":
                !this.props.allBrand.brandsFetched && fetchAllBrands()
                break
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index" scrollable={false}><Polymer {...this.props}/></Scene>
                <Scene name="allbrands" scrollable={false}><AllBrands {...this.props}/></Scene>
                <Scene name="search"><SearchBox {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default PolymerRouter;