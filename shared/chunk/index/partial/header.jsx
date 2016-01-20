'use strict';
import React,{Component} from "react";

class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header>
                <a className="logo" href="#/">
                    <img src="/client/asset/images/indexlogo.png" />
                </a>
                <a className="indexQrcode" href="#"></a>
                <a className="indexSearch" href="javascript:void(null)" 
                onClick={this.props.changeScene.bind(this,"search")}></a>
            </header>
        )
    }
}

export default Header;