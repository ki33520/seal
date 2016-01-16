'use strict';

import React,{Component} from "react";
import Polymer from "./partial/polymer.jsx";
import AllBrands from "./partial/allbrands.jsx";
import SearchBox from "./partial/search.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

class PolymerRouter extends Component{
    handleSceneChange(currentScene,prevScene){
        const {fetchHotWord,fetchAllBrands} = this.props
        switch(currentScene){
            case "search":
                !this.props.search.hotwordFetched && fetchHotWord()
            case "allbrands":
                !this.props.allBrand.brandsFetched && fetchAllBrands()
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><Polymer {...this.props}/></Scene>
                <Scene name="allbrands"><AllBrands {...this.props}/></Scene>
                <Scene name="search"><SearchBox {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default PolymerRouter;