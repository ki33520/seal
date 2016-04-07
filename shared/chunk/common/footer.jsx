'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {jumpURL} from "../../lib/jumpurl.es6";

class Footer extends Component{
    render(){
        const {activeIndex} = this.props;
        return (
            <footer className="bottom-nav">
                <ul className="clearfix">
                    <li><a href="/" className={activeIndex==="0"?"nav-hover":null}><i></i>海外购</a></li>
                    <li><a href={jumpURL("polymer")} className={activeIndex==="1"?"nav-hover":null}><i></i>分类</a></li>
                    <li><a href={jumpURL("trendy")} className={activeIndex==="2"?"nav-hover":null}><i></i>爆款</a></li>
                    <li><a href={jumpURL("cart")} className={activeIndex==="3"?"nav-hover":null}><i></i>购物车</a></li>
                    <li><a href={jumpURL("membercenter")} className={activeIndex==="4"?"nav-hover":null}><i></i>个人中心</a></li>
                </ul>
            </footer>
        );
    }
}

Footer.defaultProps = {
    activeIndex:0
}

export default Footer;