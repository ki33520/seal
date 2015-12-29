'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.inViewport === true){
            if(this._timer){
                clearTimeout(this._timer);
            }
            this._timer = setTimeout(()=>{
                this.setState({
                    isReady:true
                })
            },500);
        }
    }
    componentWillUnmount(){
        if(this._timer){
            clearTimeout(this._timer);
        }
    }
    componentDidMount(){
        var imgNode = ReactDOM.findDOMNode(this);
        this.initialHeight = imgNode.clientWidth;
        // console.log(this.initialHeight)
    }
    render(){
        let {animation} = this.props;
        let src = this.props.placeholder;
        if(this.state.isReady === true){
            src = this.props.src;
        }
        const initialStyle = {
            height:this.initialHeight
        };
        return (
            <ReactCSSTransitionGroup transitionName={animation} 
            className="lazyload-image" component="div" style={initialStyle}
            transitionEnterTimeout={300} transitionLeaveTimeout={500}>
                <div key={src} className="image-container">
                    <img src={src}/>
                    {this.props.children}
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

Image.defaultProps = {
    animation:"flip",
    inViewport:false,
    placeholder:"/asset/image/placeholder-500x500.png"
}

export default Image;