'use strict';
import React,{Component} from "react";
import classNames from "classnames";

class ShareBox extends Component{

    render(){
    	 
    	const {visible,cancelShare} = this.props;
    	const shareClass=classNames({
    		"bottomShare":true,
            "showShare":visible
    	});
        return (
            <div className={shareClass}>
                <ul>
                    <li><a href="javascript:void(0);"><img src="client/asset/images/share_1.png" /></a></li>
                    <li><a href="javascript:void(0);"><img src="client/asset/images/share_2.png" /></a></li>
                    <li><a href="javascript:void(0);"><img src="client/asset/images/share_3.png" /></a></li>
                </ul>
                <a href="javascript:void(0);" className="cancelShare" onClick={cancelShare}>取消</a>
            </div>
        )
    }
}

export default ShareBox;