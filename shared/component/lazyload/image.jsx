'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup"
import _ from "lodash"

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady:false
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible === true){
            const isSrcValid = this.props.src.search(/.*\.(jpg|png|gif|bmp|jpeg)/g)
            // console.log(this.props.src,isSrcValid)
            if(isSrcValid > -1){
                setTimeout(()=>{
                    this.setState({
                        isReady:true
                    })
                },500);
            }
        }
    }
    render(){
        const {transitionName,src} = this.props
        const {isReady} = this.state
        let placeholder = <img src={this.props.placeholder}/>
        if(_.isFunction(this.props.placeholder)){
            placeholder = this.props.placeholder()
        }
        return (
            <ReactCSSTransitionGroup transitionName={transitionName} component="div"
            transitionEnterTimeout={500} transitionLeaveTimeout={300} 
             className="lazyload-image">
             <div key={isReady} className="lazyload-image-inner">
                {isReady?<img src={src}/>:placeholder}
                {isReady && this.props.children}
             </div>
            </ReactCSSTransitionGroup>
        )
    }
}

Image.defaultProps = {
    placeholder:"",
    transitionName:"flip",
    src:""
}

export default Image;