'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Footer extends Component{
    render(){
        const {activeIndex} = this.props;
        return (
            <footer>
                <ul className="clearfix">
                    <li><a href="/" className={activeIndex==="0"?"nav-hover":null}><i></i>海外购</a></li>
                    <li><a href="/polymer" className={activeIndex==="1"?"nav-hover":null}><i></i>分类</a></li>
                    <li><a href="/trendy" className={activeIndex==="2"?"nav-hover":null}><i></i>爆款</a></li>
                    <li><a href="/cart" className={activeIndex==="3"?"nav-hover":null}><i></i>购物车</a></li>
                    <li><a href="/membercenter" className={activeIndex==="4"?"nav-hover":null}><i></i>个人中心</a></li>
                </ul>
            </footer>
        );
    }
}

Footer.defaultProps = {
    activeIndex:0
}

export default Footer;