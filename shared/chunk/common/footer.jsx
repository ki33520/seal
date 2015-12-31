'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Footer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            activeIndex: props.activeIndex
        }
    }

    handleClick(index){
        this.setState({
            activeIndex:index
        });
        switch(index){
            case 1:
                window.location.href='/navbar';
                break;
            case 2:
                window.location.href='/trendy';
                break;
            case 3:
                window.location.href='/cart';
                break;
            case 4:
                window.location.href='/membercenter';
                break;
            default:
                window.location.href='/';
                break;
        }
    }

    render(){

        var it = this;
        var list = [];

        const items = ["海外购","分类","爆款","购物车","个人中心"];

        items.map(function(item,i){
            const key = 'item-'+i;
            const hoverClass = classNames({
                "nav-hover":i==it.state.activeIndex
            });
            list.push(<li key={key} onClick={it.handleClick.bind(it,i)}><a href="#"  className={hoverClass}><i></i>{item}</a></li>)
        });

        return (
            <footer className="bottom-nav">
                <ul className="clearfix">
                    {list}
                </ul>
            </footer>
        );
    }
}

Footer.defaultProps = {
    activeIndex:0
}

export default Footer;