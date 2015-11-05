'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Slide extends Component{
    render(){
        const {active,prev,next,pseudo,key,style,animateSlide,animateSpeed} = this.props;
        const classes = classNames(this.props.className,{
            "slide":true,
            "active":active,
            "prev":prev,
            "next":next,
            "pseudo-slide":pseudo
            // active: (this.props.active && !this.props.animateIn) ||
            //     this.props.animateOut,
            // next: this.props.active && this.props.animateIn &&
            //     this.props.direction === 'next',
            // prev: this.props.active && this.props.animateIn &&
            //     this.props.direction === 'prev'
        });
        var slideStyle = {};
        if(style !== null){
            var {width,height} = style;
            width = (width !== null?width + "px":"100%");
            height = (height !== null?height + "px":"100%");
            slideStyle = {
                width,
                height
            }
        }
        if(animateSlide === true){
            slideStyle.animationDuration = (animateSpeed/1000) + "s";
            slideStyle.animationName = "slide-fade";
            slideStyle.animationTimingFunction = "ease-in-out";
            slideStyle.width = "100%";
            slideStyle.height = "100%";
        }
        return (
            <div className={classes} style={slideStyle} key={"slide-"+key}>{this.props.children}</div>
        );
    }
}

export default Slide;