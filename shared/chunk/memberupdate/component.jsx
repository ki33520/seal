'use strict'

import React,{Component} from "react";
import Update from "./partial/update.jsx";
import UpdateBasic from "./partial/updatebasic.jsx";
import UpdatePassword from "./partial/updatepassword.jsx";
import UpdateMemberCard from "./partial/updatemembercard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

class MemberUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentRoute:null,
            prevRoute:null
        }
    }
    handleSceneChange(){

    }
    render(){
        const {currentRoute,prevRoute} = this.state;
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><Update {...this.props}/></Scene>
                <Scene name="basic"><UpdateBasic {...this.props}/></Scene>
                <Scene name="password"><UpdatePassword {...this.props}/></Scene>
                <Scene name="membercard"><UpdateMemberCard {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default MemberUpdate;