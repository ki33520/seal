'use strict'

import React,{Component} from "react/addons";
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const placeholder = "/client/asset/image/blank.gif";

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady:false
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible === true){
            setTimeout(()=>{
                this.setState({
                    isReady:true
                })
            },500);
        }
    }
    componentDidMount(){
        var imgNode = React.findDOMNode(this);
        this.initialHeight = imgNode.clientWidth;
    }
    render(){
        var src = placeholder,classes="",transition="flip";
        if(this.state.isReady === true){
            src = this.props.src;
            classes="loaded";
        }
        const initialStyle = {
            height:this.initialHeight
        };
        return (
            <ReactCSSTransitionGroup transitionName={transition} component="div"
             className="lazyload-image" style={initialStyle}>
             <div key={src} style={initialStyle}>
                <img src={src} className={classes}/>
                {this.state.isReady && this.props.children}
             </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default Image;