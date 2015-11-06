'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import rAF from "../../../lib/requestAnimationFrame";
import Icon from "../core/icon.jsx";

export class Accordion extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex !== undefined?props.activeIndex:null,
            prevIndex:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== undefined && 
            nextProps.activeIndex !== this.props.activeIndex){
            this.setState({
                prevIndex:this.prop.activeIndex,
                activeIndex:nextProps.activeIndex
            })
        }
    }
    handleSelect(index,e){
        e && e.preventDefault();
        const prevIndex = this.state.activeIndex;
        // if select again then collapse else expand
        index = (prevIndex === index) ? null:index;
        this.setState({
            activeIndex:index,
            prevIndex
        },()=>{
            this.props.onSelect(index);
        })
    }
    renderItem(child,index){
        const active = (index === this.state.activeIndex);
        return React.cloneElement(child,{
            active,
            key:child.key ? child.key:index,
            handleSelect:this.handleSelect.bind(this,index)
        })
    }
    render(){
        return (
            <div className="accordion">{React.Children.map(this.props.children,this.renderItem.bind(this))}</div>
        )
    }
}

Accordion.defaultProps = {
    onSelect:function(){}
};

export class AccordionItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            ddStyle:null
        }
    }
    componentDidUpdate(prevProps){
        const {active} = this.props;
        const self = this;
        const element = React.findDOMNode(this.refs.accordionContent);
        var initialHeight,targetHeight,lastHeight;
        if(active === true && prevProps.active === false){
            targetHeight = element.offsetHeight;
            initialHeight = 0;
            // console.log('expand')
            lastHeight = initialHeight;
            rAF(function interval(){
                lastHeight += 2;
                // console.log('lastHeight',lastHeight)
                self.setState({
                    ddStyle:{
                        height:lastHeight
                    }
                })
                if(lastHeight >= targetHeight){
                    self.setState({
                        ddStyle:{
                            height:targetHeight
                        }
                    })
                    return false;
                }else{
                    rAF(interval)
                }
            })
        }
        if(active === false && prevProps.active === true){
            targetHeight = 0;
            initialHeight = element.offsetHeight;
            // console.log('collapse')
            lastHeight = 56;
            rAF(function interval(){
                lastHeight -= 2;
                // console.log('lastHeight',lastHeight)
                self.setState({
                    ddStyle:{
                        height:lastHeight,
                        display:"block"
                    }
                })
                if(lastHeight <= targetHeight){
                    self.setState({
                        ddStyle:{
                            // height:targetHeight,
                            // display:"none"
                        }
                    })
                    return false;
                }else{
                    rAF(interval)
                }
            })
        }
    }
    render(){
        const {active,key,title,handleSelect} = this.props;
        const classes = classNames("accordion-item",{
            active
        });
        var icon = (<Icon icon="right-open"/>);
        // if(active === true){
        //     icon = (<Icon icon="up-open"/>);
        // }
        // console.log('ddStyle',this.state.ddStyle)
        return (
            <dl className={classes} key={"accordion-item-" + key}>
                <dt onClick={handleSelect}>{title}{icon}</dt>
                <dd ref="accordionContent" style={this.state.ddStyle}><div className="accordion-content">{this.props.children}</div></dd>
            </dl>
        )
    }
}