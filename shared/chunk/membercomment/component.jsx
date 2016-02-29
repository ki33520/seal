'use strict'

import React,{Component} from "react";
import Comment from "./partial/comment.jsx";
import PhotoList from "./partial/photolist.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx"

import {fetchComment} from "./action.es6";

class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            photos: null
        }
    }
    handleSceneChange(currentScene,param){
        switch(currentScene){
            case "photo":
                this.setState({
                    photos: param ? param : null
                });
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index">
                    <Comment {...this.props.commentByUser} {...this.props}/>
                </Scene>
                <Scene name="photo">
                    <PhotoList {...this.state} {...this.props.commentByUser} {...this.props}/>
                </Scene>
            </SceneGroup>
        );
    }
}

export default CommentList;