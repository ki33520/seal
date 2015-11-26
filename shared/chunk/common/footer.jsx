'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Footer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 3
        }
    }

    handleChangeItem(index){
        this.setState({
            activeIndex:index
        });
        this.props.handleClick();
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
            list.push(<li key={key} onClick={it.handleChangeItem.bind(it,i)}><a href="#"  className={hoverClass}><i></i>{item}</a></li>)
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

    handleClick:function(){
        //
    }
}

export default Footer;