'use strict'
import React,{Component} from "react";

class MaskLayer extends Component{
    render(){
        const handleClick = this.props.handleClick;
        const styles = {
            display:this.props.visible === true ? "block":"none"
        }
        return (
            <div className="mask-layer" style={styles} onClick={handleClick}></div>
        );
    }
}

export default MaskLayer;