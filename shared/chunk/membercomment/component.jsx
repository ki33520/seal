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
        const {changePhotos} =  this.props;
        switch(currentScene){
            case "photo":
                changePhotos(param);
        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index">
                    <Comment {...this.props.commentByUser} {...this.props}/>
                </Scene>
                <Scene name="photo">
                    <PhotoList {...this.props.commentByUser} {...this.props}/>
                </Scene>
            </SceneGroup>
        );
    }
}

export default CommentList;