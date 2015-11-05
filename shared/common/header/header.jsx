'use strict';

import React,{Component} from "react";

class Header extends Component{
    renderBackButton(){
        const {canBack,handleGoBack} = this.props;
        if(canBack === true){
            return (
                <a href="javascript:void(null)" onClick={handleGoBack} className="iconfont icon-left-open"></a>
            )
        }
        return null
    }
    render(){
        const {title} = this.props;
        return (
            <header className="header">
                {this.renderBackButton()}
                <h1>{title}</h1>
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