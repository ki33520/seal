'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";
import Icon from "../../component/icon.jsx";
import classNames from "classnames";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0
        }
    }
    handleSearch(){
        location.href="/search"
    }
    handleClick(index){
        this.setState({
            currentIndex:index
        });
    }
    renderNav(){
        var nav = ["类别","品牌","产地"];
        return nav.map((name,i)=>{
            const classes = classNames({
                "current":i === this.state.currentIndex
            });
            return (
                <li className={classes} key={"tab-nav-"+i} 
                onClick={this.handleClick.bind(this,i)}><i>{name}</i></li>
            );
        });
    }
    render(){
        return (
            <div className="box">
                <Header>
                    <div className="btn-right" onClick={this.handleSearch.bind(this)}>
                        <Icon icon="search"/>
                    </div>
                </Header>
                <div className="polyTabs">
                    <ul>
                        {this.renderNav()}
                    </ul>
                </div>
                <div className="polyCon">
                    <div id="page-content">
                        <div className="poly_1 page-0 page-current">
                            <div className="category-bd"></div>
                            <div className="leftNav">
                            
                                <div className="name on">
                                    <div className="bd-on shake"><div>母婴用品</div></div>
                                    <div className="bd"><div>母婴用品</div></div>
                                </div>
                                <div className="name">
                                    <div className="bd-on shake"><div>美容彩妆</div></div>
                                    <div className="bd"><div>美容彩妆</div></div>
                                </div>
                                <div className="name">
                                    <div className="bd-on shake"><div>营养保健</div></div>
                                    <div className="bd"><div>营养保健</div></div>
                                </div>
                                <div className="name">
                                    <div className="bd-on shake"><div>家居洗护</div></div>
                                    <div className="bd"><div>家居洗护</div></div>
                                </div>
                                <div className="name">
                                    <div className="bd-on shake"><div>进口美食</div></div>
                                    <div className="bd"><div>进口美食</div></div>
                                </div>

                            </div>
                            
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