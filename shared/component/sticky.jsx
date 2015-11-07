'use strict'
import React,{Component} from "react";
import util from "../../lib/util.es6";
import dom from "../../lib/dom.es6";

class Sticky extends Component{
    constructor(props){
        super(props);
        this.state = {
            sticked:false,
            initialized:false,
            stickerStyle:null
        }

    }
    checkPosition(){
        const scrollTop = dom.scrollTop(this.scrollEl);
        var offsets = {};
        const {top,left,right,bottom} = this.props;
        offsets = top !== undefined ? Object.assign({},offsets,{
            top
        }):offsets;
        offsets = bottom !== undefined ? Object.assign({},offsets,{
            bottom
        }):offsets;
        offsets = left !== undefined ? Object.assign({},offsets,{
            left
        }):offsets;
        offsets = right !== undefined ? Object.assign({},offsets,{
            right
        }):offsets;
        const holder = React.findDOMNode(this.refs.holder);
        const checkResult = (scrollTop > 0);
        var stickerStyle = Object.assign({},offsets,{
            position:"absolute",
            transform:"translate3D(0,0,0)",
            // transition:"transform .05s ease-in-out",
            width:holder.offsetWidth
        });
        if(checkResult === true){
            const currentTop = top + scrollTop + "px";
            stickerStyle = Object.assign({},stickerStyle,{
                transform:"translate3D(0," + currentTop + ",0)"
                // top:currentTop
            })
        }
        this.setState({
            stickerStyle:stickerStyle,
            sticked:checkResult
        });
    }
    componentDidMount(){
        this.scrollEl = this.props.target === undefined ? React.findDOMNode(this).parentNode
         :React.findDOMNode(this.props.target);
        this.checkPosition();
        // const ownerWindow = dom.ownerWindow(React.findDOMNode(this.refs.sticker));
        util.bindEvent(this.scrollEl,"scroll",this.checkPosition.bind(this));
    }
    componentWillUnmount(){
        util.unbindEvent(this.scrollEl,"scroll",this.checkPosition.bind(this));
    }
    render(){
        var child = React.Children.only(this.props.children);
        return (
            <div className="sticky" style={this.state.stickerStyle}>
            {React.cloneElement(child,Object.assign({},child.props,{
                ref:"holder"
            }))}
            </div>
        );
    }
}

export default Sticky;