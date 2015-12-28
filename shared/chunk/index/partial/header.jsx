'use strict';
import React,{Component} from "react";

class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header>
                <a className="logo" href="#">
                    <img src="/client/asset/images/indexlogo.png" />
                </a>
                <a className="indexQrcode" href="#"></a>
                <a className="indexSearch" href="search.html"></a>
            </header>
        )
    }
}

export default Header;