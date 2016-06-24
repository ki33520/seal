'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import {jumpURL} from "../../lib/jumpurl.es6";

class Footer extends Component{
    formatCount(buyed){
        if(buyed>0){
            const num = buyed > 99 ? '99+':buyed;
            return (<em>{num}</em>)
        }
        return null;
    }
    render(){
        const {activeIndex,buyed} = this.props;
        const count = this.formatCount(buyed);
        return (
            <footer className="bottom-nav">
                <ul className="clearfix">
                    <li><a href="/" className={activeIndex==="0"?"nav-hover":null}><i></i>海外购</a></li>
                    <li><a href={jumpURL("polymer")} className={activeIndex==="1"?"nav-hover":null}><i></i>分类</a></li>
                    <li><a href="/explosion/explosion.html" className={activeIndex==="2"?"nav-hover":null}><i></i>爆款</a></li>
                    <li><a href={jumpURL("cart")} className={activeIndex==="3"?"nav-hover":null}><i></i>{count}购物车</a></li>
                    <li><a href={jumpURL("membercenter")} className={activeIndex==="4"?"nav-hover":null}><i></i>我的</a></li>
                </ul>
            </footer>
        );
    }
}

Footer.defaultProps = {
    activeIndex:0,
    buyed:0
}

export default Footer;