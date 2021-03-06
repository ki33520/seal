'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {jumpURL} from "../../../lib/jumpurl.es6";

class Footer extends Component{
    render(){
        const {activeIndex} = this.props;
        return (
            <nav className="bottomNav">
                <ul className="clearfix">
                    <li><a href={jumpURL("index")} className={activeIndex==="0"?"nav_hover":null}><i></i>海外购</a></li>
                    <li><a href={jumpURL("polymer")} className={activeIndex==="1"?"nav_hover":null}><i></i>分类</a></li>
                    <li><a href={jumpURL("trendy")} className={activeIndex==="2"?"nav_hover":null}><i></i>爆款</a></li>
                    <li><a href={jumpURL("cart")} className={activeIndex==="3"?"nav_hover":null}><i></i>购物车</a></li>
                    <li><a href={jumpURL("membercenter")} className={activeIndex==="4"?"nav_hover":null}><i></i>个人中心</a></li>
                </ul>
            </nav>
        );
    }
}

Footer.defaultProps = {
    activeIndex:0
}

export default Footer;