'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../../lib/dom.es6";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

class ShadeLayer extends Component{
    constructor(props){
        super(props);
        this.state = {
            active:true
        }
    }
    componentDidMount(){
        dom.bindEvent(window,"load",()=>{
            this.setState({
                // active:false
            })
        })
    }
    render(){
        const styles = {
            "display":this.state.active?"block":"none"
        }
        return (
            <ReactCSSTransitionGroup transitionName="fade" component="div"
            transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="shade-layer" style={styles}>
                <div className="spinner"><i className="iconfont icon-loading"/></div>
            </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default ShadeLayer;