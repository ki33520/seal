'use strict'
import React from "react";
import classNames from "classnames";

class Refresher extends React.Component{
    render(){
        var classes = classNames({
            "refresher":true,
            "refresher-active":this.props.active
        })
        return (
            <div className={classes}>
                <span className="iconfont icon-spin5 animate-spin"></span>正在加载
            </div>
        );
    }
}

export default Refresher;