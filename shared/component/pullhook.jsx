'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class PullHook extends Component{
    constructor(props){
        super(props);
        this.state = {
            pullStatus:null
        };
    }
    handleTouchStart(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
    }
    handleTouchEnd(e){
        e && e.preventDefault();
        const touchOriention = this.judgeOriention(e.changedTouches[0]);
        const {oriention,onPullEnd} = this.props;
        if(oriention === touchOriention){
            this.setState({
                pullStatus:"pulling"
            });
            onPullEnd()
        }
    }
    handleTouchMove(e){
        e && e.preventDefault();
        const touchOriention = this.judgeOriention(e.changedTouches[0]);
        const {oriention,onPullMove} = this.props;
        // console.log('oriention',touchOriention)
        if(oriention === touchOriention){
            this.setState({
                pullStatus:"pulled"
            });
            onPullMove()
        }
    }
    judgeOriention(touch){
        const {clientY,clientX} = touch;
        const offsetX = clientX - this.startTouchX;
        const offsetY = clientY - this.startTouchY;
        var oriention;
        if(Math.abs(offsetX) > Math.abs(offsetY) && offsetX > 0){
            oriention = "LEFT_TO_RIGHT";
        }else if(Math.abs(offsetX) > Math.abs(offsetY) && offsetX < 0){
            oriention = "RIGHT_TO_LEFT";
        }else if(Math.abs(offsetX) < Math.abs(offsetY) && offsetY > 0){
            oriention = "TOP_TO_BOTTOM";
        }else if(Math.abs(offsetX) < Math.abs(offsetY) && offsetY < 0){
            oriention = "BOTTOM_TO_TOP";
        }else{
            oriention = null;
        }
        return oriention;
    }
    render(){
        const classes = classNames(this.props.className,{
            "pull-move":this.state.pullStatus === "pulling",
            "pull-end":this.state.pullStatus === "pulled"
        })
        return (
            <div className={classes}
            onTouchStart={this.handleTouchStart.bind(this)} 
            onTouchMove={this.handleTouchMove.bind(this)} 
            onTouchEnd={this.handleTouchEnd.bind(this)}>{this.props.children}</div>
        )
    }
}

PullHook.defaultProps = {
    onPullMove:function(){},
    onPullEnd:function(){}
}

export default PullHook;