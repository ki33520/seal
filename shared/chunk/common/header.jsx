'use strict';

import React,{Component} from "react";

class Header extends Component{
    renderBackButton(){
        const {canBack,handleGoBack} = this.props;
        if(canBack === true){
            return (
                <a href="javascript:;" onClick={handleGoBack} className="iconfont icon-back"></a>
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
    handleGoBack:function(){
        window.history.back();
    }
}

export default Header;