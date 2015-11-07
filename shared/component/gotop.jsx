'use strict'
import React,{Component} from "react";
import util from "../../lib/util.es6";
import _ from "lodash";
import classNames from "classnames";
import {smoothScroll} from "../../lib/dom.es6";

class GoTop extends Component{
    constructor(props){
        super(props);
        this.state = {
            active:false
        };
    }
    toggleVisble(){
        const scrollTop = util.scrollTop();
        if(scrollTop > 50){
            this.setState({active:true});
        }else{
            this.setState({active:false});
        }
    }
    componentDidMount(){
        util.bindEvent(window,'scroll',_.debounce(this.toggleVisble.bind(this),100))
    }
    componentWillUnmount(){
        util.unbindEvent(window,'scroll',_.debounce(this.toggleVisble.bind(this),100))
    }
    backToTop(){
        smoothScroll(window,0);
    }
    render(){
        const classes = classNames({
            "back-to-top":true,
            "active":this.state.active
        });

        return (
            <div className={classes}>
                <a href={null} onClick={this.backToTop}><span className="iconfont icon-up-big"></span></a>
            </div>
        )
    }
}

export default GoTop;