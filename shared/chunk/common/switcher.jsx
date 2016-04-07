'use strict';

import React,{Component} from "react";
import classNames from "classnames"

export class Switcher extends Component{
    renderRoute(child,i){
        const {currentRoute,prevRoute} = this.props;
        const {name} = child.props; 
        return React.cloneElement(child,Object.assign({},child.props,{
            active:currentRoute === name,
            prev:prevRoute === name,
            key:i
        }))
    }
    render(){
        return (
            <div className="switcher">{React.Children.map(this.props.children,this.renderRoute.bind(this))}</div>
        )
    }
}

export class SwitcherCase extends Component{
    render(){
        const {key,active,prev} = this.props;
        const classes = classNames("switcher-case",{
            active,
            prev
        })
        let child = React.Children.only(this.props.children)
        child = React.cloneElement(child,Object.assign({},child.props,{
            active
        }))
        return (
            <div className={classes} key={key}>{child}</div>
        )
    }
}