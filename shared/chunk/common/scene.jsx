'use strict';
import React,{Component} from "react";
import classNames from "classnames"

export class SceneGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentScene:props.defaultScene,
            prevScene:null
        }
    }
    handleChange(scene,param,e){
        let prevScene = this.state.currentScene
        this.setState({
            currentScene:scene,
            prevScene
        },()=>{
            setTimeout(()=>this.props.onChange(scene,param,prevScene),300)
        })
    }
    renderScene(child,i){
        const {currentScene,prevScene} = this.state;
        const {name} = child.props; 
        return React.cloneElement(child,Object.assign({},child.props,{
            active:currentScene === name,
            prev:prevScene === name,
            changeScene:this.handleChange.bind(this),
            key:i
        }))
    }
    render(){
        const classes = classNames("scene-group",{
            "animation-disabled":this.state.prevScene === null
        })
        return (
            <div className={classes}>{React.Children.map(this.props.children,this.renderScene.bind(this))}</div>
        )
    }
}

SceneGroup.defaultProps = {
    defaultScene:"index",
    onChange:()=>{}
}

export class Scene extends Component{
    render(){
        const {key,active,prev,changeScene} = this.props;
        const classes = classNames("scene",{
            active,
            prev
        })
        let child = React.Children.only(this.props.children)
        child = React.cloneElement(child,Object.assign({},child.props,{
            changeScene,
            active
        }))
        return (
            <div className={classes} key={key}>{child}</div>
        )
    }
}