'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    handleClick(index){
        this.setState({
            activeIndex:index
        });
    }

    render(){
        const {nav} = this.props;
        var item = nav.map((name,i)=>{
            const classes = classNames({
                "current":i === this.state.activeIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} 
                onClick={this.handleClick.bind(this,i)}><i>{name}</i></li>
            );
        });

        return (
            <ul>{item}</ul>
        )
    }
}

class Side extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    handleClick(index){
        this.setState({
            activeIndex:index
        });
    }

    render(){
        const {nav} = this.props;
        var item = nav.map((name,i)=>{
            const classes = classNames("name",{
                "current":i === this.state.activeIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} onClick={this.handleClick.bind(this,i)}>
                    {name}
                </li>
            );
        });

        return (
            <ul className="leftNav">{item}</ul>
        )
    }
}

class Navbar extends Component{
    
    handleSearch(){
        location.href="/search"
    }
    
    
    render(){
        return (
            <div className="box">
                <Header>
                    <div className="logo"><img src="client/asset/images/indexlogo.png" /></div>
                    <div className="btn-right" onClick={this.handleSearch.bind(this)}>
                        <Icon icon="search"/>
                    </div>
                </Header>
                <div className="polyTabs">
                    <Menu nav={["类别","品牌","产地"]} />
                </div>
                <div className="polyCon">
                    <div id="page-content">
                        <div className="poly_1 page-0 page-current">
                            <div className="category-bd"></div>
                            <Side nav={["母婴用品","美容彩妆","营养保健","家居洗护","进口美食"]} />
                            
                            <div className="rightCon">
                                <div className="sh fadeIn">
                                    <a href="#" className="ad">
                                        <img src="/client/asset/images/pic24.gif"/>
                                    </a>
                                    <div className="content">
                                        <div className="title">热门分类</div>
                                        <a href="/" className="cg">
                                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                                            <div>母婴直邮</div>
                                        </a>
                                        <a href="/" className="cg">
                                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                                            <div>美妆直邮</div>
                                        </a>
                                        <a href="/" className="cg">
                                            <img src="/client/asset/images/965_G_1445533723842.gif"/>
                                            <div>保健直邮</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;