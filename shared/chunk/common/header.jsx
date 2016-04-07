'use strict';

import React,{Component} from "react";

class Header extends Component{
    renderBackButton(){
        const {canBack,onGoBack} = this.props;
        if(canBack === true){
            return (
                <a href="javascript:;" onClick={onGoBack} className="iconfont icon-back"></a>
            )
        }
        return null
    }
    render(){
        return (
            <header className="header">
                {this.renderBackButton()}
                {this.props.children}
            </header>
        );
    }
}

Header.defaultProps = {
    canBack:true,
    onGoBack:function(e){
        e.preventDefault();
        window.history.back();
    }
}

export default Header;