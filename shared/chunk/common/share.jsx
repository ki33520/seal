'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import MaskLayer from "../../component/masklayer.jsx";

class Share extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {active,onClose} = this.props
        const classes = classNames("pop-qr",{
            active
        })
        return (
            <div className="share">
                <MaskLayer visible={active}/>
                <div className={classes}>
                    <div className="btn-close iconfont icon-close" onClick={onClose}></div>
                    <div className="top">{this.props.title}</div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Share.defaultProps = {
    title:"扫码分享",
    active:false,
    onClose:()=>{}
}

export default Share